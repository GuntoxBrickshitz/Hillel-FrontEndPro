'use strict';

const input_first_name = prompt( 'Enter your first name:' );
const input_last_name = prompt( 'Enter your last name:' );
const input_age = prompt( 'Enter your age:' );

const person = {
  first_name : input_first_name.toUpperCase(),
  last_name : input_last_name.toUpperCase(),
  age: input_age,
}

alert( person.first_name + ' ' + person.last_name + ', возраст: ' + person.age );
