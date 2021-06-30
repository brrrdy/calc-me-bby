/**
 * Calc me bby
 * A calculator web app made for odin project fundamentals course
 * Author: cody@zornes.dev
 * Source: https://github.com/brrrdy/calc-me-bby
 * Project reference/requirements: 
 * https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator
 */

/**
 * Main entry point for app
 */

function main() {
  console.log("Start!");
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
    case "-":
      return subtraction(n1,n2);
      break;
    case "*":
      return multiplication(n1,n2);
      break;
    case "/":
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
 *  Janky console testing zone
 */
console.log(`64 / 16 = ${operate("/",64,16)}`);
console.log(`4 * 8 = ${operate("*",4,8)}`);
console.log(`10 - 2 = ${operate("-",10,2)}`);
console.log(`5 + 6 = ${operate("+",5,6)}`);

main();
