//const tinderUser = new Object();
const tinderUser = {}
tinderUser.name = "Paritosh";
tinderUser.age = 25;
tinderUser.occupation = "Software Engineer";
tinderUser.isLoggedIn = false;
//console.log(tinderUser);

const regularUser = {
    email : "someone@gnail.com",
    fullname : {
        userFullName : {
            firstName : "Paritosh",
            lastName : "Pradhan"
        }
    }
}

console.log(regularUser);
console.log(regularUser.fullname.userFullName.firstName);

const obj1 ={
    1 : "one",
    2 : "two",
    3 : "three"
}
const obj2 ={
    3 : "three",
    4 : "four",
    5 : "five"
}

// const obj3 = Object.assign({}, obj1, obj2);
// console.log(obj3);

const obj3 = {...obj1, ...obj2};
console.log(obj3);

const users = [
{
    id: 1,
    name : "xyz",
    age: 15
},
{
    id: 10,
    name : "xyz",
    age: 15
},
{
    id: 1,
    name : "xyz",
    age: 15
}
]

users[1].name = "Paritosh";
console.log(users);

console.log(tinderUser);
console.log(Object.keys(tinderUser));
console.log(Object.values(tinderUser));
console.log(Object.entries(tinderUser));

console.log(tinderUser.hasOwnProperty("isLoggedIn"));