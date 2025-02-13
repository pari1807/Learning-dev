/*
    Function in JavaScript
    A function is a block of code that performs a specific task.
    A function is executed when it is invoked.
    You can pass data, known as parameters, into a function.
    A function can return data as a result.

    Syntax:
    function functionName(parameters) {
        // code to be executed
    }
*/ 

function sayName(){
    console.log("Hello, My name is Paritosh");
}
sayName();

function PrintCounting(){
    for (var i = 1; i <= 10; i++) {
        console.log(i);
    }
}
PrintCounting();

// New basic average function for two numbers
function average(num1, num2) {
    return (num1 + num2) / 2;
}
console.log("Average of 10 and 20 is: " + average(10, 20));

function PrintNumber(num){
    console.log("Printing Number: ", num);
}
PrintNumber(10);


/*
     a function can also use as a variable 
     Syntax:
        let variableName = function(parameters) {
            // code to be executed
        }
        
        while Passing the Parameters call  the variable name 
*/ 


//Arrow Function
let add =(a,b)=>{
    return a+b;
}
console.log(add(10,20));
