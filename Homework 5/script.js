'use strict';

const input = prompt('Enter numbers separated by comma:');
const words = input.split(',');
let numbers = [];

words.forEach( item => {
  let value = item.trim();  
  
  if (value !== ''){
    value = +value;

    if (!isNaN(value)) {
      numbers.push(value);
    }
  }
} );

if (numbers.length > 0) {
  let max = numbers[0];
  let sum = 0;
  let even = [];
  
  numbers.forEach( item => {
    if (item > max) {
      max = item;
    }

    sum += item;

    if (item % 2 === 0) {
      even.push(item);
    }
  } );

  alert('Max number: ' + max + '\n' + 
        'Sum of all numbers: ' + sum + '\n' + 
        'Even numbers: ' + even.join(', ')
       );
}
else {
  alert('You haven\'t entered any number');
}

// git пока не получилось подключить к vs code :(