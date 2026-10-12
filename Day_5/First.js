// const jsonData = '{"Name": "Rajeev" , "age":"20" , "course" : "java"}';

// const student = JSON.parse(jsonData);

// console.log("Student details -> " + student);
// console.log("Student Name -> " +student.Name);
// console.log("Student Age -> " +student.age);
// console.log("Student Course -> " +student.course);


// const student = {
//     name : "Rajeev",
//     age : 21,
//     course : " Frontend"
// };

// const jsonString = JSON.stringify(student);

// console.log(jsonString);
// console.log(typeof(student));
// console.log(typeof(jsonString));


const student = {
    name : "Rajeev",
    address:{
        city:"Rewari",
        state:"Haryana"
    }

};

console.log(student.name);
console.log(student.address);
console.log(student.address.city);
console.log(student.address.state); 