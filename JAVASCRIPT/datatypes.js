//Primitive and Non-Primitive Data Types
/*
7 types: String , Number, Boolean, null, undefined, symbol ,BigInt 

Reference types/Non primitive Data types 
Array, Objects, Functions
*/
const score = 100
const scoreValue = 100.3

const isLoggedIn = false
const outsideTemp = null
let userEmail;

const id = Symbol('123')
const anotherId = Symbol('123')

console.log(id === anotherId);
// const bigNumber = 3456543576654356754n



// Reference (Non primitive)

// Array, Objects, Functions

const heros = ["shaktiman", "naagraj", "doga"];
let myObj = {
    name: "hitesh",
    age: 22,
}

const myFunction = function(){
    console.log("Hello world");
}
myFunction();
console.log(typeof anotherId);


//Stack Memory for Primitive Data Types and Heap Memory for Non-Primitive Data Types
let myYoutubeName = "paritoshdotcom";
let anotherName = myYoutubeName;

anotherName = "Sneha";
console.log(myYoutubeName, anotherName);