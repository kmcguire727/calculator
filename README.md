# Calculator
 
A vanilla HTML/CSS/JS calculator built for [The Odin Project](https://www.theodinproject.com/lessons/foundations-calculator)'s Foundations curriculum, styled after a 1970s FACIT desktop calculator.
 
**Live demo:** https://kmcguire727.github.io/calculator/ 

## Features
 
- Basic arithmetic: add, subtract, multiply, divide
- Decimal input, with a warning dialog if you try to enter more than one
- Warning dialog when you try to chain two operators in a row
- Divide-by-zero protection
- Output capped to 10 characters, rounding via `toPrecision(10)` for anything longer
- Hover feedback on buttons

## Why the layout looks unusual
 
The button grid deliberately mirrors a vintage FACIT electromechanical calculator (`img/mimic-device.jpeg`) — numbers on the left, operators stacked down the right — rather than the standard 3-wide numpad grid most calculator apps use. The `%` key performs division (not percentage) for something aesthetically different.
 
## Tech stack
 
Plain HTML, CSS, and JavaScript. No frameworks, build steps, or dependencies.
 
## Running locally
 
Clone the repo and open `index.html` directly in a browser
 
## Project structure
 
```
calculator/
├── index.html
├── main.js
├── styles.css
└── img/          # favicons + design references (Windows Calculator, FACIT mockup)
```
 
## License
 
MIT
 