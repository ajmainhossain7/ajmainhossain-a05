1️⃣ What is the difference between var, let, and const?

Ans :  With var, the same variable can be redeclared, and it was commonly used in older versions of JavaScript.

    var name = "Ajmain"

With let, the same variable name cannot be redeclared, but its value can be changed.

    let age = "50"

With const, the value cannot be changed after declaration, and it must be initialized at the time of declaration.

    const name = "Ajmain"


2️⃣ What is the spread operator (...)?

Ans  :  The spread operator (...) is used to expand elements of an array or object into individual values. It is commonly used to copy arrays, merge arrays, or pass arguments to functions.

Example  : 

    const arr1 = [1,2,3]
    const arr2 = [...arr1,4,5]
    console.log(arr2)
    // [1,2,3,4,5]


3️⃣ What is the difference between map(), filter(), and forEach()?

Ans  :  map() works on each element of an array and returns a new array.

Example  :  

    const numbers = [1,2,3]
    const result = numbers.map(n => n*2)

filter() selects elements based on a condition and returns a new array.

Example  :  

    const numbers = [1,2,3,4]
    const result = numbers.filter(n => n>2)

Both map() and filter() return a new array.


forEach() is used to loop through each element of an array, but it does not return a new array.

Example  :  

    numbers.forEach(n => console.log(n))


4️⃣ What is an arrow function?

Ans  :  An arrow function is a modern and concise syntax in JavaScript (introduced in ES6) for writing function expressions using the => symbol.They are commonly used for callbacks and short helper functions because they make the code shorter and handle the keyword differently.

Example  :  

    const add = (a,b) => a + b


5️⃣ What are template literals?

Ans  :  Template literals are a modern way to write strings in JavaScript using backticks (``).They allow variables or expressions to be easily embedded inside a string using ${}.

Example  :  

    const name = "Ajmain"
    console.log(`Hello ${name}`)