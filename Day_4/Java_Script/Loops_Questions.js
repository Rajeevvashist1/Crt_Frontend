// Question 1 --> Print numbers from 1 to 10 using a for loop
for (let i = 1; i <= 10; i++) {
    console.log(i);
}   

// Question 2--> print numnber from 10 to 1 using a for loop 

for(let i = 10; i >= 1; i--){
    console.log(i);
}

//Question 3 --> Print even number 1 to 50 

for (let i = 1 ; i <= 50; i++) {
    if (i % 2 === 0){
        console.log(i);
    }
}

//Question 4 --> Print odd number 1 to 50

for (let i = 1 ; i <= 50; i++) {
    if (i % 2 !== 0){
        console.log(i);
    }   
}

//Queston 5 --> Sum of Numbers from 1 to 100

let sum = 0;

for ( let i = 1 ; i <= 100; i++){
    sum = sum + i;
}
console.log("The sum of numbers from 1 to 100 is: " + sum);

//Queston 6--> multiplication Table

let number = 25;

console.log("Multiplication Table of " + number + ":");
for ( let i = 1 ; i <= 10 ; i++){
    console.log(number + " x " + i + " = " + (number * i));
}

//Question 8 --> Sum of even numbers from 1 to 100

let evensum = 0;
for (let i = 1 ; i <= 100; i++) {
    if (i % 2 === 0) {
        evensum = evensum + i;
    }
}
console.log("The sum of even numbers from 1 to 100 is: " + evensum);

//Question 9 --> Sum of odd numbers from 1 to 100

let oddsum = 0;
for (let i = 1 ; i <= 100; i++) {
    if (i % 2 !== 0) {
        oddsum = oddsum + i;
    }
}
console.log("The sum of odd numbers from 1 to 100 is: " + oddsum);  

//Question 10 --> Factorial of a number

let num = 5;
let factorial = 1;
for (let i = 1; i <= num; i++) {
    factorial = factorial * i;
}
console.log("The factorial of " + num + " is: " + factorial);
