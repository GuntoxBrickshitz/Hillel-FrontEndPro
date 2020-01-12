'use strict';

let operation;
let argumentOne;
let argumentTwo;
let result;

do {
  operation = prompt( 'Enter operation +, -, *, /' );
}
while ( operation != '+' && operation != '-' && operation != '*' && operation != '/' );

do {
  argumentOne = +prompt( 'Enter first argument:' );
}
while ( isNaN( argumentOne ) );

do {
  argumentTwo = +prompt ( 'Enter second argument:' );
}
while ( isNaN( argumentTwo ) );

switch ( operation ) {
  case '+':
    result = argumentOne + argumentTwo;
    break;
  case '-':
    result = argumentOne - argumentTwo;
    break;
  case '*':
    result = argumentOne * argumentTwo;
    break;
  case '/':
    result = argumentOne / argumentTwo;
    break;
  default:    
    result = 'unknown operation';
}

// alert( `${argumentOne} ${operation} ${argumentTwo} = ${result}` );

alert( 'Result: ' + result );