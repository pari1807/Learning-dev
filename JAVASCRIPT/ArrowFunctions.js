const user = {
    username: 'Cherry',
    price : 100,

    welcomeMessage : function(){
        console.log(`Welcome to the website ${this.username}`);
        console.log(this);
    }
}

// user.welcomeMessage();
// user.username  = "Paritosh";
// user.welcomeMessage();

// console.log(this);

// function random(){
//     console.log(this);
// }
// random();

// const arrowFunction = () => {
//     let price = 100;
//     console.log(price);
// }
// arrowFunction();

// const addTwo = (num1, num2) => {
//     return num1 + num2;
// }
// console.log(addTwo(5, 6));

//implicit statements
const addTwo = (num1, num2) => (num1 + num2);
console.log(addTwo(5, 6));