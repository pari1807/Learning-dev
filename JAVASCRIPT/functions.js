
// function addTwoNumbers(a, b) {
//   console.log( a + b );
// }

function addTwoNumbers(a, b) {
  return a + b;
}

const result = addTwoNumbers(2, 3);
//console.log("result: ",result);

function loginUserMessage(username){
    if(username === undefined){
        return "Please provide a username";
    }
    if(typeof(username) !== "string"){
        return "Username should be a string";
    }
    return `${username} is logged in`;
}
console.log(loginUserMessage("John"));


function calculateCartPrice(...num1){ //Rest Operator
    return num1;
}

console.log(calculateCartPrice(1,2,3,4,5,6,7,8,9,10));

const user = {
    name: "John",
    age: 25,
    price: 199
}

function handleObject(anyObject){
    console.log(`Username is ${anyObject.name} and price is ${anyObject.price}`);

}

handleObject(user);


