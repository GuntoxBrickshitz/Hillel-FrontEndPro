'use strict';

let result_value = 0;
let result_text = '0';
let operation = '';
let param;
let number;

do {
  param = prompt( 'Result: ' + result_text + '\nEnter number or operation: + - * / end' );

  switch ( param ) {
	case null:
	case 'end':    
	break;

  	case '+':
  	case '-':
	case '*':
	case '/':
  	  if ( operation != ''){    	
    	result_text = result_value;
  	  }
 	 
  	  operation = param;
  	  result_text += ' ' + operation;
	  break;
    
	default:     
  	  number = parseFloat( param.replace( ',', '.' ) );

  	  if ( !isNaN ( number ) ) {
		if ( operation == '') {
		  result_value = number;
		  result_text = '' + result_value;
		}
		else {
		  switch ( operation ) {
		    case '+':        	  
			  result_value += number;			  
			break;
  
			case '-':
			  result_value -= number;			
			break;
   
			case '*':
			  result_value *= number;
		    break;
  
		    case '/':
			  if( number != 0 ){
			    result_value /= number;
			  }
			break;
		  }
  
		  result_text += number + ' = ' + result_value;
		  operation = '';
		} 
  	  }
  } // switch param
}
while ( param != null && param != 'end' );