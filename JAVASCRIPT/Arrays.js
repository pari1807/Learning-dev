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