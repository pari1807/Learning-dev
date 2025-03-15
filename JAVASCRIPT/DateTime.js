let myDate = new Date();
console.log(myDate);//gives a jumbled date format
console.log(myDate.toString());//converts the date into string including gmt time and timezone
console.log(myDate.toDateString())//gives only date and day
console.log(myDate.toTimeString())//gives only time;
console.log(myDate.toLocaleString())//gives the date and time in local time zone
console.log(myDate.toISOString())//gives the date and time in iso format

console.log(typeof myDate);//object
console.log(myDate.getFullYear());//gives the year'

let myCreatedDate = new Date(2023,0,11);
console.log(myCreatedDate.toDateString());//gives the date of 11th jan 2023

let myTimeStamp = Date.now();
console.log(myTimeStamp);//gives the timestamp in milliseconds

// Additional date & time information examples:

// Get day of the week (0 = Sunday, 6 = Saturday)
console.log("Day of Week (0=Sun,6=Sat):", myDate.getDay());

// Get month (0 = January, 11 = December)
console.log("Month (0=Jan,11=Dec):", myDate.getMonth());

// Get day of month
console.log("Day of Month:", myDate.getDate());

// Get hours, minutes, and seconds
console.log("Hours:", myDate.getHours());
console.log("Minutes:", myDate.getMinutes());
console.log("Seconds:", myDate.getSeconds());

// UTC Methods: to get universal date and time values
console.log("UTC Full Year:", myDate.getUTCFullYear());
console.log("UTC Month:", myDate.getUTCMonth());
console.log("UTC Date:", myDate.getUTCDate());
console.log("UTC Hours:", myDate.getUTCHours());

// Localized formatted date using Intl.DateTimeFormat
const formattedDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
}).format(myDate);
console.log("Formatted Date:", formattedDate);

// Function to add days to a date
function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
console.log("Date after 5 days:", addDays(myDate, 5).toLocaleString());