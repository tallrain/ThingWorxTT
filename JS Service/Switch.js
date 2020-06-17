switch(variable) {
  case value1:
    command1;
    break;
  case value2:
    command2;
    break;  
  default:
    command for other cases;
}

var tmp = "";
switch(y) {
    case 1:
    	tmp = "a selected"; 
      break;
    case 2:
    	tmp = "b selected"; 
      break;
    case 3:
    	tmp = "c selected"; 
      break;  
    default:
      tmp = "";
      break;
}
var result = tmp;

var tmp = "";
switch(true) {
    case y == 1:
    	tmp = "a selected"; 
        break;
    case y == 2:
    	tmp = "b selected"; 
        break;
    case y > 2:
    	tmp = "c selected"; 
        break;  
    default:
        tmp = "";
        break;
}
var result = tmp;
