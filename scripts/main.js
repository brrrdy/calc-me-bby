/**
 * Calc me bby
 * A calculator web app made for odin project fundamentals course
 * Author: cody@zornes.dev
 * Source: https://github.com/brrrdy/calc-me-bby
 * Project reference/requirements: 
 * https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator
 */

 const KEYS = ["1","2","3","4","5","6","7","8","9","0",".","="];

 /**
  * Enum for operators.
  * @readonly
  * @enum {{name: string, symbol: string}}
  */
 const Operators = Object.freeze({
  BACKSPACE: { name: "backspace", symbol: "⌫"},
  CLEAR: {name: "clear", symbol: "CLR"},
  DIVIDE: {name: "divide", symbol: "÷"},
  MULTIPLY: {name: "multiply", symbol: "×"},
  SUBTRACT: {name: "subtract", symbol: "−"},
  ADD: {name: "add", symbol: "+"}
 });

/** Global vars */
let DISPLAY = ""; // current display value
let LASTRESULT = 0; // last result for carrying values forward
let OPERANDS = []; 

/**
 * Entry point for app
 */
function main() {
  createKeypad();
  createOperators();
  registerKeys();
}

function isOperator(symbol) {
  for (const op in Operators) {
    if (symbol === Operators[op].symbol) {
      return true;
    }
  }
  return false;
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
 * Attempt to get the calculated result of current input
 */
function getResult() {
  const op = getOperator();
  let terms = getFirstTwoTerms(op);
  let result = operate(op, parseFloat(terms[0]), parseFloat(terms[1]));
  LASTRESULT = result;
  return result;
}

/**
 * Get all operands in DISPLAY
 * 
 * @returns {number} The number of operands currently in DISPLAY
 */
function getOperands() {
  // TODO: refactor operator/operand tracking so this isn't necessary...
  let ops = [];
  for (const op in Operators){ 
    ops.push(Operators[op].symbol);
  }
  let rx = RegExp(`(?:[${ops}])`, `i`);
  let operands = DISPLAY.split(rx).filter(x => x);
  return operands;
}


/** 
 * Handles various inputs from the keypad/operator keys 
 * 
 * @param {string} input String form of input determined by key
 */
function handleInput(input) {

  if (input === Operators.BACKSPACE.symbol) {
    if (DISPLAY === "") {
    } else {
      let nd = DISPLAY.slice(0, -1);
      clearDisplayInput();
      pushToDisplayInput(nd);
    }
    return;
  }

  if (input === "=") {
    if (OPERANDS.length < 2) {
      return;
    }
    // attempt to parse input
    doCalc();
    OPERANDS = [];
    return;
  } else if (input === "."){
    // TODO: rework to put leading 0 if decimal is the first input
    // check if decimal point already exists in display term
    if (OPERANDS[OPERANDS.length-1].indexOf(".") !== -1) {
      return;
    }
  } else if (input === Operators.CLEAR.symbol) {
    if (DISPLAY === "") {
      clearDisplayOutput();
    } else {
      clearDisplayInput();
    }
    return;
  }
  if (isOperator(input)) {
    //short circuit if we already have an operator
    // TODO: refactor operator/operand tracking so this isn't necessary...
    let ops = [];
    for (const op in Operators){ 
      ops.push(Operators[op].symbol);
    }
    if (DISPLAY.match(`([${ops}]$|^$)`, `i`)) {
      return;
    }

    if (OPERANDS.length > 1) {
      let result = doCalc();
      if (Number.isFinite(result)) {
        pushToDisplayInput(result);
      } else {
        return;
      }
    }
  }
  pushToDisplayInput(input);
  OPERANDS = getOperands();
}


/**
 * Does calculations
 * @returns {string} representation of calulation result
 */
function doCalc() {
  let result = checkDivByZero() ? getCheekyErrorText() : getResult();
  pushToDisplayOutput(DISPLAY, result);
  clearDisplayInput();
  return result;
}

/**
 * Checks if the entered equation is a division by zero
 * @returns {boolean} true if we are dividing by zero, else false
 */
function checkDivByZero() {
  const op = getOperator();
  if (op === Operators.DIVIDE.symbol && OPERANDS.length > 1) {
    if (Number(OPERANDS[1]) === 0) {
      return true;
    }
  }
  return false;
}

/**
 * Gets the terms split by the first operator in DISPLAY
 * 
 * @param {string} op The operator in the current DISPLAY equation
 * @returns {array} A length 2 array of terms split by "op"
 */
function getFirstTwoTerms(op) {
  return DISPLAY.split(op,2);
}

/**
 * Gets the current DISPLAY's operator
 * 
 * @returns First operator in the current DISPLAY equation
 */
function getOperator() {
  for (const op in Operators) {
    const operator = Operators[op];
    if (DISPLAY.indexOf(operator.symbol) !== -1) {
      return operator.symbol;
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
  for (const op in Operators) {
    const button = document.createElement("button");
    button.classList.add("operator-button");
    button.textContent = Operators[op].symbol;
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
 * Registers keypad keys to call handleInput with respective key
 */

function registerKeys() {
  document.addEventListener('keydown', function(event) {
    switch (event.code) {
      case "Numpad0": 
        handleInput('0');
        break;
      case "Numpad1": 
        handleInput('1');
        break;
      case "Numpad2": 
        handleInput('2');
        break;
      case "Numpad3": 
        handleInput('3');
        break;
      case "Numpad4": 
        handleInput('4');
        break;
      case "Numpad5": 
        handleInput('5');
        break;
      case "Numpad6": 
        handleInput('6');
        break;
      case "Numpad7": 
        handleInput('7');
        break;
      case "Numpad8": 
        handleInput('8');
        break;
      case "Numpad9": 
        handleInput('9');
        break;
      case "NumpadDivide": 
        handleInput(Operators.DIVIDE.symbol);
        break;
      case "NumpadMultiply": 
        handleInput(Operators.MULTIPLY.symbol);
        break;
      case "NumpadSubtract":
        handleInput(Operators.SUBTRACT.symbol);
        break;
      case "NumpadAdd":
        handleInput(Operators.ADD.symbol);
        break;
      case "Enter":
        handleInput('=');
        break;
      case "NumpadDecimal":
        handleInput('.');
        break;
      case "Backspace":
        handleInput(Operators.BACKSPACE.symbol);
        break;
    }
  });
}

function pressKey(input) { 
  handleInput(input);
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

/**
 * Returns random result of cheeky error text to display
 * @returns {string} Cheeky error text
 */
function getCheekyErrorText() {
  const errs = [ 
    "I'm sorry Dave.",
    "I'm afraid I can't do that.",
    "NO MATH FOR YOU!",
    "I don't think so, Tim.",
    "It's a no from me, Dawg.",
    "To err is human."
  ];

  return errs[Math.floor(Math.random()*(errs.length))];
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

