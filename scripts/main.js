/**
 * Calc me bby
 * A calculator web app made for odin project fundamentals course
 * Author: cody@zornes.dev
 * Source: https://github.com/brrrdy/calc-me-bby
 * Project reference/requirements: 
 * https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator
 */

 const KEYS = ["1","2","3","4","5","6","7","8","9","0",".","="];
 const OPS = ["C","÷", "×", "−", "+"];

/** Global vars */
let DISPLAY = ""; // current display value
let LASTRESULT = 0; // last result for carrying values forward

/**
 * Main entry point for app
 */
function main() {
  createKeypad();
  createOperators();
}

/**
 * Clears the display input field
 */
function clearDisplayInput() {
  const displayInput = document.querySelector(".display-input");
  displayInput.textContent = "";
  DISPLAY = "";
}

/**
 * Clears all of the display output entries
 */
function clearDisplayOutput() {
  let clearOutput = document.querySelectorAll(".display-output .output");
  for (let output of clearOutput) {
    output.remove();
  }
}


/** 
 * Handles various inputs from the keypad/operator keys 
 */
function handleInput(input) {
  if (input === "=") {
    // attempt to parse input
    console.log(DISPLAY);
    let op = getOperator();
    let terms = getTerms(op);
    let result = operate(op, parseFloat(terms[0]), parseFloat(terms[1]));
    pushToDisplayOutput(DISPLAY, result);
    LASTRESULT = result;
    clearDisplayInput();
    return;
  } else if (input === "."){
    // check if decimal point already exists in display term
    return;
  } else if (input === "C") {
    if (DISPLAY === "") {
      clearDisplayOutput();
    } else {
      clearDisplayInput();
    }
    return;
  }
  pushToDisplayInput(input);
}

/**
 * Gets the terms split by the first operator in DISPLAY
 * 
 * @param {string} op The operator in the current DISPLAY equation
 * @returns A length 2 array of terms split by "op"
 */
function getTerms(op) {
  return DISPLAY.split(op);
}

/**
 * Gets the current DISPLAY's operator
 * 
 * @returns First operator in the current DISPLAY equation
 */
function getOperator() {
  for (let op of OPS) {
    if (DISPLAY.indexOf(op) !== -1) {
      return op;
    }
  }
}

/**
 * Creates and appends an output element with a given equation and result
 * 
 * @param {string} equation Equation to display in historical output
 * @param {string} result Right side result to display with the equation
 */
function pushToDisplayOutput(equation, result) {
  const displayout = document.querySelector(".display-output");
  displayout.appendChild(createOutput(equation, result));
}

/**
 * Appends an input string to the calculator input display and updates
 * the DISPLAY variable
 * 
 * @param {string} input String to append to the input display
 */
function pushToDisplayInput(input) {
  DISPLAY += input;
  const displayInput = document.querySelector(".display-input");
  displayInput.textContent = DISPLAY;  
}

/**
 * Defines and creates a 4x3 keypad from KEYS global array
 */
function createKeypad() {
  const keypad = document.querySelector(".keypad");

  const colCount = 3;
  const rowCount = 4;

  for (let i = 0; i < rowCount; i++) {
    const keyRow = document.createElement("div");
    keyRow.classList.add("keypad-row");
    // loop thru col, create/add button to row
    for (let j = 0; j < colCount; j++) {
      let keyIndex = (i*colCount)+j;
      if (KEYS[keyIndex]) {
        const button = document.createElement("button");
        button.classList.add("keypad-button");

        button.textContent = KEYS[keyIndex];

        button.addEventListener("click", (e) => {
          handleInput(e.target.textContent);
        });

        keyRow.appendChild(button);
      }
    }
    keypad.appendChild(keyRow);
  }
}


/**
 * Defines and creates supported arithmetic operators from OPS global array
 */
function createOperators() {
  const operators = document.querySelector(".operators");

  const opCol = document.createElement("div");
  opCol.classList.add("operators-col");
  for (let op of OPS) {
    const button = document.createElement("button");
    button.classList.add("operator-button");
    button.textContent = op;
    button.addEventListener("click", (e) => {
      handleInput(e.target.textContent);
    });
    opCol.appendChild(button);
  }
  operators.appendChild(opCol);
}

/**
 * Creates and returns a div with the equation and result inputs
 * 
 * @param {string} equation Equation to display
 * @param {string} result Calculated result
 * @returns Div element with classed and structured input
 */
function createOutput(equation, result) {
  const eq = document.createElement("div");
  eq.classList.add("equation");
  eq.textContent = equation;

  const res = document.createElement("div");
  res.classList.add("result");
  res.textContent = result;

  const out = document.createElement("div");
  out.classList.add("output");

  out.appendChild(eq);
  out.appendChild(res);

  return out;
}

/**
 * Perform an operation with the given operator and numbers
 * 
 * @param {string} op Operator to perform
 * @param {number} n1 First operand
 * @param {number} n2 Second operand
 * @returns {number} The operation result
 */
function operate(op, n1, n2) {
  switch(op) {
    case "+":
      return addition(n1,n2);
      break;
    case "−": // U+2212
      return subtraction(n1,n2);
      break;
    case "×": // U+00D7
      return multiplication(n1,n2);
      break;
    case "÷":
      return division(n1,n2);
      break;
  }
}

/**
 * Returns the sum of two numbers
 * 
 * @param {number} n1 The first number to add.
 * @param {number} n2 The second number to add.
 * @returns {number} The sum of n1 and n2.
 */
function addition(n1, n2) {
  return n1 + n2;
}

/**
 * Returns the result of subtraction between two numbers
 * 
 * @param {number} n1 The number to subtract from. 
 * @param {number} n2 The amount to subtract from n1.
 * @returns {number} The difference between n1 and n2.
 */
function subtraction(n1,n2) {
  return n1 - n2;
}


/**
 * Returns the result of multiplication between two numbers
 * 
 * @param {number} n1 The first number to multiply
 * @param {number} n2 The second number to multiply
 * @returns The multiplication result of n1 and n2
 */
function multiplication(n1,n2) {
  return n1 * n2;
}

/**
 * Returns the result of division of n1 by n2
 * 
 * @param {number} n1 The dividend to divide
 * @param {number} n2 The divisor to divide by
 * @returns The quotient (result of division) of n1 by n2
 */
function division(n1,n2) {
  return n1 / n2;
}


main();

/**
 *  Janky console testing zone
 */
// console.log(`64 / 16 = ${operate("/",64,16)}`);
// console.log(`4 * 8 = ${operate("*",4,8)}`);
// console.log(`10 - 2 = ${operate("-",10,2)}`);
// console.log(`5 + 6 = ${operate("+",5,6)}`);


// const displayout = document.querySelector(".display-output");
// displayout.appendChild(createOutput("1 + 2", "3"));

