# GitHub Issues Tracker

### 1. What is the difference between var, let, and const?
* var: It works inside a function, not block. So it is Function-scoped. It can be redeclared and reassigned.
* let: It works inside braces {}. It is block-scoped. It can be reassigned but cannot be redeclared in the same scope.
* const: It is block-scoped. It cannot be reassigned or redeclared. It must be initialized when declared.

### 2. What is the spread operator (...)?
The Spread operator (...) is used to expand elements of an array, object, or string.
* For arrays, it spreads elements into another array.
* For objects, it copies all properties into a new object.
* For function calls, it spreads an array as separate arguments.

### 3. What is the difference between map(), filter(), and forEach()?
* map(): Goes through each item in an array and returns a new array with modified values.
* filter(): Goes through each item in an array and returns a new array with only items that pass a condition.
* forEach(): Goes through each item in an array and does not return anything (undefined).

### 4. What is an arrow function?
An arrow function is a shorter way to write a function in JavaScript using ' => ' instead of the 'function' keyword. It can be written in a single line for simple returns, or with curly braces '{ }' for multiple statements.

### 5. What are template literals?
Template literals are a way to write strings in JavaScript using backsticks (``). They let us include variables or expressions directly inside a string using ${...}.
