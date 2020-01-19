'use strict';

const calculator = createCalculator(10); 
calculator.add(45) // возвращает 55 
calculator.sub(45) // возвращает -35 
calculator.div(5) // возвращает 2 
calculator.mult(5) // возвращает 50 
calculator.set(100) // устанавливает базовое значение в 100 
calculator.mult(5) // возвращает 500

function createCalculator(value) {
  let result = value;

  return {
    add: function operationAdd(value) {
      result += value;
      console.log(result);
    },
    sub: function operationSub(value) {
      result += value;
      console.log(result);
    },
    mult: function operationMult(value) {
      result *= value;
      console.log(result);
    },
    div: function operationDiv(value) {
      result /= value;
      console.log(result);
    },
    set: function set(valToSet) {
      result = valToSet;
    }
  }          
}

/*
function operationAdd(value) {
  result += value;
  console.log(result);
}

function operationSub(value) {
  result += value;
  console.log(result);
}

function operationMult(value) {
  result *= value;
  console.log(result);
}

function operationDiv(value) {
  result /= value;
  console.log(result);
}
*/