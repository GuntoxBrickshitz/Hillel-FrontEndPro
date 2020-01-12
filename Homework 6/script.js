'use strict';

const operList = {
  add: function (acc, item) { return acc + item; },
  sub: function (acc, item) { return acc - item; },
  mult: function (acc, item) { return acc * item; },
  div: function (acc, item) { return acc / item; },
}

let operText = '';
let operation;
let argCount;
let some;
let value;
let argList = [];

for (let key in operList) {
  operText += key + ' ';
}

do {
  operation = prompt('Enter operation: ' + operText);
}
while ( !(operation in operList) );

do {
  argCount = Number(prompt('Enter parameters count [1 to 4]: '));
}
while (isNaN(argCount) || !Number.isInteger(argCount) || argCount < 1 || argCount > 4);

for (let i = 0; i < argCount; i++) {  
  do {
    value = Number(prompt('Enter parameter: '));
  }
  while (isNaN(value));

  argList.push(value);
}

alert('Result: ' + argList.reduce(operList[operation]));

// test commit 3



