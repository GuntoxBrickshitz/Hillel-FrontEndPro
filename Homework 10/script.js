'use strict';

const calculator = createCalculator(10); 
calculator.add(45);
calculator.sub(45);
calculator.div(5);
calculator.mult(5);
calculator.set(100); 
calculator.mult(5);

function createCalculator(value) {
  let basicValue = value;

  return {
    add(operand) {
      let result = basicValue + operand;
      console.log(result);
      return result;     
    },    
    sub(operand) {
      let result = basicValue - operand;
      console.log(result);
      return result; 
    },
    mult(operand) {
      let result = basicValue * operand;
      console.log(result);
      return result; 
    },
    div(operand) {
      if (operand != 0) {
        let result = basicValue / operand;
        console.log(result);
        return result; 
      }
      else {
        console.log('Error: division by zero!');
        return NaN;
      }      
    },
    set(newValue) {
      basicValue = newValue;
    }
  }          
}