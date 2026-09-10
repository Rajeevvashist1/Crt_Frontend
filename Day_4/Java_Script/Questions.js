// Queston 1 --> person Age above 18 can vote

let age = 23;

if (age >= 18) {
    console.log("You are eligible to vote.");
} else {
    console.log("You are not eligible to vote.");
}

//Question 2 --> grade based on marks 90 , 80 , 60 ,55 , 33 pass fail and grade

let marks = 85;

if (marks >= 33) {
    console.log("You have passed.");
    if (marks >= 90) {
        console.log("Grade: A");
    } else if (marks >= 80) {
        console.log("Grade: B");
    } else if (marks >= 60) {
        console.log("Grade: C");
    } else if (marks >= 55) {
        console.log("Grade: D");
    }
} else {
    console.log("You have failed.");
}

// Question 3 --> check if number is even or odd

let number = 34;

if (number % 2 === 0) {
    console.log("The number is even.");
} else {
    console.log("The number is odd.");
}

//Question 4 --> Temperature check temp above 30 is hot below 30 is cold

let temperature = 28;

if (temperature > 30) {
    console.log("It's hot outside.");
}
else {
    console.log("It's cold outside.");
}   


//Question 5 --> Profit or Loss calculation

let costPrice = 100;
let sellingPrice = 150;

if (sellingPrice > costPrice) {
    console.log("You have made a profit.");
} else if (sellingPrice < costPrice) {
    console.log("You have incurred a loss.");
} else {
    console.log("You have neither made a profit nor incurred a loss.");
}

//Question 6 --> check if number is positive or negative

let num = -5;

if (num > 0) {
    console.log("The number is positive.");
} else if (num < 0) {
    console.log("The number is negative.");
} else {
    console.log("The number is zero.");
}

//Question 7 --> check Divisibility by 3

let numToCheck = 9;

if (numToCheck % 3 === 0) {
    console.log("The number is divisible by 3.");
} else {
    console.log("The number is not divisible by 3.");
}

//Question 8 --> Check Year is Leap Year or Not

let year = 2024;

if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    console.log("The year is a leap year.");
} else {
    console.log("The year is not a leap year.");
}


//Queston 9 --> Zero or Non-Zero Number Check

let checkNum = 0;

if (checkNum === 0) {
    console.log("The number is zero.");
} else {
    console.log("The number is not zero.");
}

//Question 10 --> Boolean value check 

let isTrue = true;

if (isTrue) {
    console.log("The boolean value is true.");
} else {
    console.log("The boolean value is false.");
}