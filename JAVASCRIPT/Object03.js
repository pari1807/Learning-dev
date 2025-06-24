// const myObject = {
//     js: "JavaScript",
//     py : "Python",
//     c: "C",
//     java: "Java",
//     cpp: "C++",
//     ruby: "Ruby",
//     php: "PHP",
//     go: "Go",
//     swift: "Swift",
//     kotlin: "Kotlin"    
// }

// for(const key in myObject){
//     console.log(`${key} shortcut is for ${myObject[key]}`);
// }

// const map = new Map()
// map.set('js', 'JavaScript');
// map.set('py', 'Python');
// map.set('c', 'C');  
// map.set('java', 'Java');
// map.set('cpp', 'C++');

// for(const [key, value] of map){
//     console.log(`${key} shortcut is for ${value}`);
// }


// //Using for each loop
// const myArray = ['JavaScript', 'Python', 'C', 'Java', 'C++'];
// myArray.forEach((item, index,myArray) => {
//     console.log(item,index,myArray);
// });

// const myCoding = [
//     {
//         languageName: "javascript",
//         languageFileName : "javascript.js",
//     },
//     {
//         languageName: "python",
//         languageFileName : "python.py",
//     },
//     {
//         languageName: "c",
//         languageFileName : "c.c",
//     }
// ]

// myCoding.forEach(() => {
//     console.log("Language Name: ", myCoding[0].languageName);
// })

// const myNums = [1, 2, 3, 4, 5, 6,]
// const newNums = myNums.filter((num) => num > 4);

// console.log(newNums);
// console.log(myNums);


// const Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// //const newNumbers = Numbers.map((num) => num * 2);

// const newNumbers = Numbers
//         .map((num) => num*10)
//         .map((num) => num+2)
//         .filter((num)=> num>=40);
// console.log(newNumbers);


// const Numbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// // const myNums = Numbers1.reduce(function (accumulator, currval){
// //    console.log(`acc: ${accumulator}, currval: ${currval}`);
// //     return accumulator + currval;
// // }, 0)

// const myTotal = Numbers1.reduce((accumulator, currval) => accumulator+currval,0)

// console.log(myTotal);

const course = [
    {
        name: "javascript",
        price: 1000,
    },
    {
        name: "python",
        price: 500,
    },
    {
        name: "java",
        price: 800,
        },
        {
            name: "c++",
            price: 600,
            },
]
const priceToPay = course.reduce((acc,item)=> acc+item.price,0)
console.log(priceToPay);