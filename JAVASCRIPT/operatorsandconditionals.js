let a = 5;
let b = 10;

// Arithmetic Operators
// Perform basic arithmetic operations
console.log(a + b); // Addition
console.log(a - b); // Subtraction
console.log(a * b); // Multiplication
console.log(a / b); // Division
console.log(a % b); // Modulus
console.log(a ** b); // Exponentiation

// Assignment Operators
// Demonstrate pre-increment, pre-decrement, post-increment, and post-decrement operators
console.log(a++); // Post-increment
console.log(a--); // Post-decrement
console.log(++a); // Pre-increment
console.log(--a); // Pre-decrement

// Perform compound assignment operations
console.log(a += b); // Addition assignment
console.log(a -= b); // Subtraction assignment
console.log(a *= b); // Multiplication assignment
console.log(a /= b); // Division assignment
console.log(a %= b); // Modulus assignment
console.log(a **= b); // Exponentiation assignment

// Comparison Operators
// Compare values and return boolean results
console.log(a == b); // Equal to
console.log(a != b); // Not equal to
console.log(a > b); // Greater than
console.log(a < b); // Less than
console.log(a >= b); // Greater than or equal to
console.log(a <= b); // Less than or equal to

// Logical Operators
// Perform logical operations and return boolean results
console.log(a && b); // Logical AND
console.log(a || b); // Logical OR
console.log(!a); // Logical NOT
console.log(!b); // Logical NOT

// Combined Comparison and Logical Operators
// Combine comparison and logical operations
console.log(a == b && a > b); // Logical AND with comparison
console.log(a == b || a > b); // Logical OR with comparison
console.log(a == b && a < b); // Logical AND with comparison
console.log(a == b || a < b); // Logical OR with comparison
console.log(a != b && a > b); // Logical AND with comparison
console.log(a != b || a > b); // Logical OR with comparison
console.log(a != b && a < b); // Logical AND with comparison
console.log(a != b || a < b); // Logical OR with comparison
console.log(a >= b && a > b); // Logical AND with comparison
console.log(a >= b || a > b); // Logical OR with comparison
console.log(a >= b && a < b); // Logical AND with comparison
console.log(a >= b || a < b); // Logical OR with comparison
console.log(a <= b && a > b); // Logical AND with comparison
console.log(a <= b || a > b); // Logical OR with comparison
console.log(a <= b && a < b); // Logical AND with comparison
console.log(a <= b || a < b); // Logical OR with comparison
console.log(a == b && a == b); // Logical AND with comparison
console.log(a == b || a == b); // Logical OR with comparison
console.log(a == b && a != b); // Logical AND with comparison

// Conditional Statements
// Using if, else if, and else
if (a > b) {
    console.log("a is greater than b");
} else if (a < b) {
    console.log("a is less than b");
} else {
    console.log("a is equal to b");
}

// Ternary Operator
// Using ternary operator for conditional assignment
let max = (a > b) ? a : b;
console.log("The maximum value is " + max);

let min = (a < b) ? a : b;
console.log("The minimum value is " + min);
