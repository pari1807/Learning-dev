const marvel_heroes = ["thor","Iron-man","Hulk"];
const dc_heroes = ["Batman","Superman","flash"];

// marvel_heroes.push(dc_heroes);
// console.log(marvel_heroes);
// console.log(marvel_heroes.length);

let allHeroes = marvel_heroes.concat(dc_heroes);
console.log(allHeroes);
console.log(allHeroes.length);

//using spread operator 
const allHeroes2 = [...marvel_heroes, ...dc_heroes];
console.log(allHeroes2);
console.log(allHeroes2.length);

//using flat method if there is array inside array inside another array you can easily divide into subparts
const another_array = [1, 2, 3, [4, 5, 6], 7,[6, 7, [8, 9, 10]]];
const real_another_array = another_array.flat(Infinity);
console.log(real_another_array);
console.log(real_another_array.length);

//convert strings to arrays
console.log(Array.isArray("Paritosh"));
console.log(Array.from("Paritosh"));
console.log(Array.from({name: "Paritosh", age: 25}));//it will give you an empty array because it is not an iterable object


let score1 = 100;
let score2 = 200;
let score3 = 300;

console.log(Array.of(score1, score2, score3));

