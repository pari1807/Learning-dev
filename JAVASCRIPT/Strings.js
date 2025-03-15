const name = "paritosh";
const repo = "LearningDev";

console.log(`My name is ${name} and I am learning ${repo}`);

const gameName = new String("PUBG");
console.log(gameName[0]);
console.log(gameName.__proto__);

// New string properties and methods examples for learning
const sampleStr = "Hello, JavaScript!";
console.log("Sample String:", sampleStr);
console.log("Length:", sampleStr.length);                      // Get length of the string
console.log("Character at index 7:", sampleStr.charAt(7));       // Get character at a specific index
console.log("Index of 'Script':", sampleStr.indexOf("Script"));   // Find the position of a substring
console.log("Substring (7,17):", sampleStr.substring(7, 17));     // Extract substring between indices
console.log("Slice (7):", sampleStr.slice(7));                   // Extract substring from a starting index
console.log("Uppercase:", sampleStr.toUpperCase());              // Convert to uppercase
console.log("Lowercase:", sampleStr.toLowerCase());

// Additional string method examples:

// .trim() - remove whitespace from both ends of a string
const paddedStr = "   trimmed string example   ";
console.log("Trimmed:", paddedStr.trim());

// .replace() - replace a substring with a new substring
const replacedStr = sampleStr.replace("JavaScript", "JS");
console.log("Replaced 'JavaScript' with 'JS':", replacedStr);

// .includes() - check if a string contains a specified substring
console.log("Includes 'Hello':", sampleStr.includes("Hello"));

// .split() - split the string into an array by a specified delimiter
const splitStr = sampleStr.split(", ");
console.log("Split by ', ':", splitStr);
