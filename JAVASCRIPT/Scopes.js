// Global Scope: variables declared outside any function or block are accessible everywhere.
var globalVar = "I am a global variable";
console.log("Global Scope:", globalVar);

// Function Scope: Variables declared with var inside a function are local to that function.
function functionScopeExample() {
    var localVar = "I am local to functionScopeExample";
    console.log("Inside functionScopeExample:", localVar);
}
functionScopeExample();
// console.log(localVar); // Un-commenting this line would cause an error because localVar is not defined globally.

// Block Scope: Variables declared with let or const inside a block (e.g., inside {}) are only accessible within that block.
if (true) {
    let blockLet = "I exist only within this if block (using let)";
    const blockConst = "I exist only within this if block (using const)";
    var blockVar = "I am declared with var, so my scope is the enclosing function/global";
    console.log("Inside block:", blockLet);
    console.log("Inside block:", blockConst);
    console.log("Inside block (var):", blockVar);
}
// blockVar is accessible here due to var's function/global scope.
console.log("Outside block (var):", blockVar);
// console.log(blockLet); // This would throw an error because blockLet is block scoped.

// Loop Scope: Variables declared with let inside a loop are scoped to that loop.
for (let i = 0; i < 3; i++) {
    console.log("Loop index (block scope):", i);
}
// console.log(i); // i is not defined outside the loop

// Nested Scopes: Inner blocks can access variables in outer scopes.
let outer = "outer variable";
{
    let inner = "inner variable";
    console.log("Accessing outer in inner block:", outer);
    console.log("Inside inner block:", inner);
}
// console.log(inner); // Error: inner is not defined in the global scope

// Function expressions and arrow functions also follow the same scoping rules.
let add = (a, b) => {
    // 'a' and 'b' are scoped to this arrow function.
    return a + b;
};
console.log("Arrow function add(5, 3):", add(5, 3));



function one(){
    const username ="paritosh";

    function two(){
        const website = "paritosh.com";
        console.log(username);
    }
    //console.log(website);
    two();
}
one();

if(true){
    const username = "Rahul";
    if(username === "Rahul"){
        const website = "youtube";
        console.log(username + website );
        }
       // console.log(website);
}

// +++++++++++++++++++++++++++++++++++ interesting ++++++++++++++++++++++++++++++++++++++++++++++

function addone(num){
    return num +1;
}
console.log(addone(5));

const addTwo = function(num){
    return num + 2;
}
console.log(addTwo(5));