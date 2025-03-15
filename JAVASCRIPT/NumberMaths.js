const score = 400;
console.log(score);

const scoreValue = new Number(100);
console.log(scoreValue);

console.log(scoreValue.toString().length);
console.log(scoreValue.toFixed(2));

const otherNumber = 123.8966;
console.log(otherNumber.toPrecision(3));

const hundreds = 1000000;
console.log(hundreds.toLocaleString('en-IN'));

//+++++++++++++++++ MATHS ++++++++++++++++++++++++
console.log(Math);

// Additional Math property examples:
console.log("Math.PI:", Math.PI);                // PI constant
console.log("Math.E:", Math.E);                  // Euler's number

// Square root, power, and absolute value examples
console.log("Square root of 16:", Math.sqrt(16)); // Square root of 16
console.log("2 raised to the power 3:", Math.pow(2, 3)); // Exponentiation

// Maximum and minimum values from a set of numbers
console.log("Max of [3, 5, 2, 8]:", Math.max(3, 5, 2, 8));
console.log("Min of [3, 5, 2, 8]:", Math.min(3, 5, 2, 8));

console.log("Absolute value of -100:", Math.abs(-100)); // Absolute value of -100

// Rounding examples
console.log("Rounded value of 4.7:", Math.round(4.7));    // Rounding to nearest integer
console.log("Floor value of 4.7:", Math.floor(4.7));        // Rounding down
console.log("Ceiling value of 4.3:", Math.ceil(4.3));         // Rounding up



// to generate a random value in maths
console.log(Math.random());
console.log((Math.random()*10) + 1);
console.log(Math.floor(Math.random()*10) + 1);

const min = 10;
const max = 20;

console.log(Math.floor(Math.random()*(max-min+1))+min)