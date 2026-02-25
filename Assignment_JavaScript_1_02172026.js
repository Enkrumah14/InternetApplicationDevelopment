/**
 * @author: Manny Nkrumah
 * @professor: Dr. Ghayad  
 * @class: CSC 353
 * @date: 02/24/2026
 * @assignment: Assignment_JavaScript_1_02172026.docx
 * @description: Practice with common JS functions.
 */

/* Q1 Search Method*/

let greeting = "Hello, welcome to JavaScript!";
// Searching for the word "welcome" using a regular expression
let position = greeting.search(/welcome/); 

console.log("\nQ1: " + position); // Output: 7
///////////////////////////////////////////////////////////////////////////
/* Q2 Slice Method */
let fruits = "Apple, Banana, Kiwi";
// Extracting from index 7 up to (but not including) index 13
let slicedFruit = fruits.slice(7, 13); 

console.log("\nQ2: " + slicedFruit); // Output: "Banana"
///////////////////////////////////////////////////////////////////////////
/* Q3 Split Method */
let list = "dog,cat,bird";
// Splitting the string at every comma
let animalArray = list.split(","); 

console.log("\nQ3: " + animalArray); // Output: ["dog", "cat", "bird"]
///////////////////////////////////////////////////////////////////////////
/*Q4 Include Method*/
let sentence = "The quick brown fox jumps over the lazy dog.";
// Checking if the word "fox" exists in the string
let hasFox = sentence.includes("fox"); 

console.log("\nQ4: " + hasFox); // Output: true
///////////////////////////////////////////////////////////////////////////
/*Q5 charAt */
let word = "Coding";
// Getting the character at index 2 (the 3rd letter, since it's zero-indexed)
let letter = word.charAt(2); 


console.log("\nQ5: " +letter); // Output: "d"
///////////////////////////////////////////////////////////////////////////
/* Q6 Index Of Method */
let phrase = "Learn to code, code to learn.";
// Finding the first time "code" appears
let firstCode = phrase.indexOf("code"); 

console.log("\nQ6: " + firstCode); // Output: 9
///////////////////////////////////////////////////////////////////////////
/* Q7 Substring Method*/
let text = "JavaScript";
// Extracting characters from index 0 up to (but not including) index 4
let subText = text.substring(0, 4); 

console.log("\nQ7: " + subText); // Output: "Java"

