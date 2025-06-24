// // For Loop
// // Loop from 1 to 10
// for (let i = 1; i <= 10; i++) {
//     console.log(i);
// }

// // For Loop with break
// // Will only print numbers 1 to 4
// for (let i2 = 1; i2 <= 10; i2++) {
//     if (i2 === 5) break; // Exits the loop when i reaches 5
//     console.log(i2);
// }

// // For Loop with continue
// // Will print all numbers except 5
// for (let i3 = 1; i3 <= 10; i3++) {
//     if (i3 === 5) continue; // Skips iteration when i is 5
//     console.log(i3);
// }
// //no learning point here, just a simple loop example

// // While Loop
// // Loop while a condition is true
// let j = 1;
// while (j <= 10) {
//     console.log(j);
//     j++;
// }

// // While Loop with break
// let j2 = 1;
// while (j2 <= 10) {
//     if (j2 === 5) break; // Exits the loop at 5
//     console.log(j2);
//     j2++;
// }

// // Do-While Loop
// // Loop at least once, then continue while a condition is true
// let k = 1;
// do {
//     console.log(k);
//     k++;
// } while (k <= 10);

// // Do-While Loop with continue
// let k2 = 0;
// do {
//     k2++;
//     if (k2 === 5) continue; // Skips printing 5
//     console.log(k2);
// } while (k2 < 10);

// // For-In Loop
// // Loop through the properties of an object
// const person = { name: "John", age: 30, city: "New York" };
// for (let key in person) {
//     console.log(key + ": " + person[key]);
// }

// // For-In Loop with break
// const person2 = { name: "John", age: 30, city: "New York" };
// for (let key2 in person2) {
//     if (key2 === "age") break; // Stops after printing name
//     console.log(key2 + ": " + person2[key2]);
// }

// // For-Of Loop
// // Loop through the values of an iterable object (like an array)
// const numbers = [1, 2, 3, 4, 5];
// for (let num of numbers) {
//     console.log(num);
// }

// // For-Of Loop with continue
// const numbers2 = [1, 2, 3, 4, 5];
// for (let num2 of numbers2) {
//     if (num2 % 2 === 0) continue; // Skips even numbers
//     console.log(num2);
// } 

let myArray = [1, 2, 3, 4, 5];

let arr = 0;
while (arr < myArray.length) {
    console.log(myArray[arr]);
    arr++;
}

//maps 
let myMap = new Map();
myMap.set('name', 'Alice');
myMap.set('age', 25);
myMap.set('city', 'Wonderland');    


for (let [key, value] of myMap) {
    console.log(`${key}: ${value}`);
}   