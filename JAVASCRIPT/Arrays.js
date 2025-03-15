let obj = {
    name: "Paritosh",
    age: 25,
    occupation: "Software Engineer",
    greet: function(){
        console.log("Hello, My name is " + this.name);
    }
};

console.log(obj);
obj.greet();

console.log(typeof(obj));

let obj2=obj;


let arr = [1,2,3,4,5,6,7,8,9,10];
console.log(arr);

let brr=new Array('pari','tosh','benjwal');
console.log(brr);


const myArr = ["shaktiamn", "naagraj", "doga"];
console.log(myArr);

const myArr2 = new Array(1,2,3,4);
myArr2.push(5);
myArr2.push(6);
myArr2.push(7);
console.log(myArr2);

// New array method examples:

// .pop() - removes the last element and returns it
const popped = myArr2.pop();
console.log("Popped element:", popped);
console.log("After pop:", myArr2);

// .unshift() - adds one or more elements at the beginning
myArr2.unshift(0);
console.log("After unshift (added 0):", myArr2);

// .shift() - removes the first element and returns it
const shifted = myArr2.shift();
console.log("Shifted element:", shifted);
console.log("After shift:", myArr2);

// .includes() - checks if an array contains a specific element
console.log("myArr2 includes 3:", myArr2.includes(3));
console.log("myArr includes 'tosh':", myArr.includes("tosh"));

// .indexOf() - returns the index of a specified element (first occurrence)
console.log("Index of 4 in myArr2:", myArr2.indexOf(4));
console.log("Index of 'doga' in myArr:", myArr.indexOf("doga"));

// .join() - joins all elements of an array into a string with a separator
let joined = myArr.join(" - ");
console.log("Joined myArr:", joined);

// .slice() - returns a shallow copy of a portion of an array
// Here, get elements from index 1 up to (but not including) index 3
let sliced = myArr2.slice(1, 3);
console.log("Sliced portion of myArr2 (indices 1 to 2):", sliced);

// .splice() - removes/adds elements to the array
// Remove 2 elements from index 1 and insert new elements if needed
let spliced = myArr2.splice(1, 2);
console.log("Elements removed using splice:", spliced);
console.log("myArr2 after splice:", myArr2);