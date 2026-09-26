//---- GUI ----//
const container = document.querySelector(".container");
const dialog = document.querySelector("dialog");
const dialogMessage = document.getElementById('warning-message');
const closeButton = document.querySelector("dialog button");
let screen = document.getElementById('screen')

// Strings help concat values before needing to eval
const WINDOW_SIZE = 10;
let operand1 = "";
let operator = "";
let operand2 = "";
let solution = null;
let phase = 1;
screen.textContent = operand1;

//---- FUNCTIONS ----//

function showModal(purpose) {
  switch (purpose) {
    case "decimal":
      dialogMessage.textContent = "You can't have more than one decimal";
      dialog.showModal();
      break;     
    case "operator":
      dialogMessage.textContent = "You can't put another operator";
      dialog.showModal();
      break;
    case "zero":
      dialogMessage.textContent = "You can't divide by zero.";
      dialog.showModal();
      break;
  }
}

function clearAll() {
  operand1 = "";
  operator = "";
  operand2 = "";
  solution = null;
  phase = 1;
  screen.textContent = operand1;
}

function updateScreen(phase) {
  console.log(phase);

  switch (phase) {
    case 1:
      screen.textContent = roundIfNeeded(operand1);
      break;
    case 2:
      screen.textContent = roundIfNeeded(operand2);
      break;
    case 3:
      screen.textContent = roundIfNeeded(solution);
      break;
  }
}

// function containsSpecial(value) {
//   // A defined list of common special characters
//   const specialChars = ["CE", ".", "%", "X", "-", "+", "="];
//   return specialChars.includes(value);
// }

function findButtonType(classNameString) {
  if (classNameString.includes("num")) {
    return "Number";
  }
  else if (classNameString.includes("modifier")) {
    return "Modifier";
  }
  else if (classNameString.includes("operator")) {
    return "Operator";
  }
}

// Keep screen / output to 10-characters.
function roundIfNeeded(value) {
  if (value.toString().length > WINDOW_SIZE) {
      return Number(value).toPrecision(10);
  } else {
      return value;
  }
}

// add, typecasting to number just in case
function add(a, b) {
  return roundIfNeeded(Number(a) + Number(b));
}

// subtract, typecasting to number just in case
function subtract(a, b) {
  return roundIfNeeded(Number(a) - Number(b));
}

// multiply, typecasting to number just in case
function multiply(a, b) {
  return roundIfNeeded(Number(a) * Number(b));
}

// divide, checking for division by zero and typecasting to number just in case
function divide(a, b) {
  switch (b) {
    case 0:
      showModal("zero");
      break;
    default:
      return roundIfNeeded(Number(a) / Number(b));
  }
}

function operate(a, operation, b) {
  let ans = null;

  switch (operation) {
    case "+":
      ans = add(a, b);
      break;
    case "-":
      ans = subtract(a, b);
      break;
    case "%":
      ans = divide(a, b);
      break;
    case "X":
      ans = multiply(a, b);
      break;
  }

  return ans;
}

// Following eventListeners used to listen for the mouse hovering / exiting any of the buttons housed within the container.
// CSS is protecting from screen color changing since the hover rule only applies to button types
container.addEventListener('mouseover', (event) => {
  event.target.classList.add('hover');
});

container.addEventListener('mouseout', (event) => {
  event.target.classList.remove('hover');
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

/**
 * This event listener does the following: Detect the click, Determine what got clicked, If it is an operand, place it into an appropriate variable, If it is an operator, take action on what you have and move to the next step
 */
container.addEventListener('click', (event) => {

  // Check if the clicked element (or its parent) is a button
  const button = event.target.matches("button");
  
  // If a button wasn't clicked, exit the function so the container click does nothing
  if (!button) {
    return;
  }

  let value = event.target.innerText;
  let buttonType = findButtonType(event.target.className);

  console.log(`Value = ${value}\nType = ${buttonType}`);

  if (value === "CE") {
    clearAll();
    operand1 = "";
    return;
  }

  switch (phase) {
    // Phase 1 is the phase where nothing is on screen / in memory yet
    case 1:
      if (buttonType != "Operator") {
        if (operand1.includes(".") && value === ".") {
          showModal("decimal");
        } 
        else {
          operand1 += value;
          updateScreen(phase);
      }}
      else if (buttonType === "Operator"){
        operator = value;
        phase = 2;
        updateScreen(phase);
      }
      break;

    case 2:
    // Phase 2 is where you have both a number in operand 1, and a desired operation to perform
      if (buttonType != "Operator") {
        operand2 += value;
        updateScreen(phase);
      }
      else if (value === "="){
        solution = operate(Number(operand1), operator, Number(operand2));
        phase = 3;
      }
      else {
        showModal("operator");
      }
      break;
    
    case 3:
    // Phase 3 is where you have a solution present. You will only hit this case if you press a key having a solution in place, which will determine next steps.
      if (buttonType != "Operator") {
        clearAll();
      }
      else if (buttonType === "Operator"){
        operand1 = solution;
        operand2 = "";
        operator = value;
        phase = 2;
        updateScreen(phase);
      }
      break;
  }

  // This lives outside the switch since you want the solution to appear immediately once someone hits enter
  if (phase === 3) {
    updateScreen(phase);
  }

  console.log(`Operand 1 = ${operand1}\nOperator = ${operator}\nOperand 3 = ${operand2}\nSolution = ${solution}\nPhase = ${phase}`);

});

