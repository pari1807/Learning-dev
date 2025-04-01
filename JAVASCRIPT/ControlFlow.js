//Control Flow Statements 

//1. If Statement - Real World Example: Check if a person is eligible to vote
let voterAge = 20;
if (voterAge >= 18) {
    console.log('Eligible to vote');
}

//2. If Else Statement - Real World Example: Check if a shopping cart qualifies for a discount
let cartTotal = 45;
if (cartTotal >= 50) {
    console.log('Discount applied');
} else {
    console.log('Add more items to get a discount');
}

//3. Else If Statement - Real World Example: Grade evaluation based on score
let score = 82;
if (score >= 90) {
    console.log('Grade: A');
} else if (score >= 75) {
    console.log('Grade: B');
} else if (score >= 60) {
    console.log('Grade: C');
} else {
    console.log('Grade: F');
}

//4. Switch Statement - Real World Example: Determine if a day is weekday or weekend
let day = 'Tuesday';
switch (day) {
    case 'Saturday':
    case 'Sunday':
        console.log('Weekend');
        break;
    default:
        console.log('Weekday');
        break;
}

// Additional Examples:

// Additional If Statement Example: Check if a variable is defined
let someValue = null;
if (someValue) {
    console.log('Value is defined');
}

// Additional If-Else Example: Validate user login status
let isLoggedIn = false;
if (isLoggedIn) {
    console.log('Welcome back!');
} else {
    console.log('Please login to continue');
}

// Additional Else-If Example: Determine season based on month
let month = 'April';
if (month === 'December' || month === 'January' || month === 'February') {
    console.log('Winter');
} else if (month === 'March' || month === 'April' || month === 'May') {
    console.log('Spring');
} else if (month === 'June' || month === 'July' || month === 'August') {
    console.log('Summer');
} else if (month === 'September' || month === 'October' || month === 'November') {
    console.log('Fall');
} else {
    console.log('Not a valid month');
}

// Additional Switch Statement Example: Determine meal based on time of day
let time = 14;
switch (true) {
    case (time < 12):
        console.log('Breakfast');
        break;
    case (time < 17):
        console.log('Lunch');
        break;
    case (time < 22):
        console.log('Dinner');
        break;
    default:
        console.log('Late Night Snack');
        break;
}

/* falsy values---------
{false, 0,-0, BigInt, 0n, "", null, undefined, NaN, ""}

truthy values---------
{"0" , 'false', " ", [], {}, FUNCTION(){}}*/


//Nullish Coalescing Operator (??) Example: Provide default value if variable is null or undefined
let userName = null;
let defaultName = 'Guest';
let displayName = userName ?? defaultName;
console.log(displayName); // Output: Guest
//Optional Chaining Example: Safely access nested object properties
let user = { profile: { name: 'Alice' } };
let user_Name = user.profile?.name ?? 'Anonymous';
console.log(user_Name); // Output: Alice
