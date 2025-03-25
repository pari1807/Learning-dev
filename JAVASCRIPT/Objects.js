//singleton object 

//object Literals

const mySym = Symbol("my symbol");

const JsUser = {
    name : "Paritosh",
    [mySym]: "mykey1",
    "full name" : "Paritosh Pradhan",
    age : 25,
    email : "paritoshpradhan@gmail.com",
    occupation : "Software Engineer",
    displayDetails : function(){
        console.log("Hello, My name is " + this.name);
    },
    lastLoginDays : ["Monday", "Tuesday"]
}

console.log(JsUser.occupation);
console.log(JsUser["full name"]);
console.log(JsUser["name"]);
console.log(JsUser[mySym]);
console.log(typeof(JsUser[mySym]));


console.log(JsUser);

//u can freeze object if u don't want to change the object
JsUser.email = "paritohrahul5@gmail.com";
Object.freeze(JsUser);
console.log(JsUser);

//u can seal object if u don't want to add or delete any property
JsUser.age = 26;
console.log(JsUser);
Object.seal(JsUser);
console.log(JsUser);


