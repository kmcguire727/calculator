// Globals
const WINDOW_SIZE = 10;
//strings for simplicity on the operands to push values onto then cast when needed
let operand1 = "";  
let operator = "";
let operand2 = "";
let solution = null;
let phase = 1;

//---- FUNCTIONS ----//

function clearScreen() {
  return 1;
}

function containsSpecial(value) {
  // A defined list of common special characters
  const specialChars = ["CE", ".", "%", "X", "-", "+", "="];
  return specialChars.includes(value);
}

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
      return Number(value.toPrecision(10));
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
          window.alert("You can't divide by zero silly...Woodeboogah!")
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

//---- GUI ----//
const CALCULATOR_BUTTONS = 16;
const container = document.querySelector(".container");

// Following 2 event listeners used to listen for the mouse hovering and eventually exiting any of the buttons housed within the container. CSS is protecting from screen color changing since the hover rule only applies to button types
container.addEventListener('mouseover', (event) => {
  event.target.classList.add('hover');
});

container.addEventListener('mouseout', (event) => {
  event.target.classList.remove('hover');
});

/**
 * This event listener needs to: 
 * - Detect the click
 * - Determine what got clicked
 * - If it is an operand, place it into an appropriate variable
 * - If it is an operator, take action on what you have and move to the next step
 */
container.addEventListener('click', (event) => {
  let value = event.target.innerText;
  let buttonType = findButtonType(event.target.className);
  
  console.log(`Value = ${value}\nType = ${buttonType}`);

  switch (phase) {
    case 1:
      if (value === "CE") {
        clearScreen();
        operand1 = "";
      }
      else if (buttonType != "Operator") {
        operand1 += value;
      } 
      else if (buttonType === "Operator"){
        clearScreen();
        operator = value;
        phase = 2;
      }
      break;

    case 2:
      if (value === "CE") {
        clearScreen();
        operand2 = "";
      }
      else if (buttonType != "Operator") {
        operand2 += value;
      } 
      else if (value === "="){
        clearScreen();
        solution = operate(Number(operand1), operator, Number(operand2));
        phase = 3;
        // NEED TO DETERMINE IF PHASE 3 IS THE RIGHT THING
      }
      else {
        window.alert("You can't put another operator in silly...Woodeboogah!")
      }
      break;
  }

  console.log(`Operand 1 = ${operand1}\nOperator = ${operator}\nOperand 3 = ${operand2}\nSolution = ${solution}`);

});

// operation will consist of a number, an operator, and another number. For example, 3 + 5. Create three variables, one for each part of the operation. You’ll use these variables to update your display later.

// Create a new function operate that takes an operator and two numbers and then calls one of the above functions on the numbers.

// Create a basic HTML calculator with buttons for each digit and operator (including =).

// There should also be a display for the calculator. Go ahead and fill it with some dummy numbers so it looks correct.

// Add a “clear” button.

// Create the functions that update one of your number variables when the calculator’s digit buttons are clicked. Your calculator’s display should also update to reflect the value of that number variable.

// Make the calculator work! You’ll need to store the first and second numbers input by the user and then operate() on them when the user presses the = button, according to the operator that was selected between the numbers.

// You should already have the code that can populate the display, so once operate has been called, update the display with the result of the operation.

// This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

// GOTCHAS
// Your calculator should not evaluate more than a single pair of numbers at a time. For example, this is how your calculator should function:
// Enter a number (12).
// Enter an operator (+).
// Enter a second number (7).
// Enter a second operator (-). At this point, it should evaluate the initial pair of numbers (12 + 7), then display the result (19).
// Enter another number (1).
// Enter another operator or equals sign (=). At this point, it should use the previous result (19) as the first number, the operator (-), and the new number (1) to calculate the new equation 19 - 1. You should see the result (18) on the display.
// To see what this looks like in action, feel free to input the equation we just explained 12 + 7 - 1 = into this online calculator.
// You should round answers with long decimals so that they don’t overflow the display.
// Pressing = before entering all of the numbers or an operator could cause problems!
// Pressing “clear” should wipe out any existing data. Make sure the user is really starting fresh after pressing “clear”.
// Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!
// Make sure that your calculator only runs an operation when supplied with two numbers and an operator by the user. Example: you enter a number (2), followed by an operator button (+). You press the operator button (+) a second consecutive time. Your calculator should not evaluate this as (2 + 2) and should not display the result (4). If consecutive operator buttons are pressed, your calculator should not run any evaluations, it should only take the last operator entered to be used for the next operation.
// When a result is displayed, pressing a new digit should clear the result and start a new calculation instead of appending the digit to the existing result. Check whether this is the case on your calculator!
// Extra credit
// Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though, like: 12.3.56.5. Disable the . button if there’s already a decimal separator in the display.
// Add a “backspace” button, so the user can undo their last input if they click the wrong number.
// Add keyboard support!