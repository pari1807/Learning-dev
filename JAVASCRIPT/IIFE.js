// Immediately Invoked Function Expression (IIFE)
//There is a problem of Global Scope pollution in the above code.
//To avoid this we can use IIFE.
//IIFE is a function that is executed right after it is created.

// function one(){
//     console.log("DB Connection Opened");
// }
// one();

(function one(){
    console.log("DB Connection Opened");
})();

//(function ......)();

// function two(user){
//     console.log(`DB Connection Closed ${user}`);
// }
// two("Paritosh");

((user) =>{
    console.log(`DB Connection Closed ${user}`);
})("Paritosh");

// Additional IIFE examples and in-code explanation:

// Example 1: IIFE that returns a value immediately.
// This IIFE calculates the sum of two numbers and returns the result,
// which is then stored in the variable 'result'.
let result = (function(a, b) {
    // 'a' and 'b' are local to this function; they are not polluting the global scope.
    return a + b;
})(5, 10);
console.log("Result from IIFE returning a value:", result);

// Example 2: IIFE to create a private scope.
// This pattern is useful to encapsulate variables and functions without
// adding them to the global scope.
(function() {
    var privateVar = "I am private";
    console.log("Inside IIFE, privateVar:", privateVar);
    // The variable 'privateVar' is not accessible outside this function.
})();

// Example 3: IIFE with parameters for immediate configuration.
// Here, the IIFE sets up a configuration object and logs a message.
(function(config) {
    console.log("Configuring system with host:", config.port);
})({
    host: "localhost",
    port: 8080
});