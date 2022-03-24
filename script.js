function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}
function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}
function getFormattedNumber(num){ //9999 to 9,999 i.e a string with a language-sensitive representation of the number.
	if(num=="-"){  //if -ve operator 
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));  //9,999 to 9999
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){   //loop across all operators
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){   //backspace i.e CE
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);  //To remove last digit
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
            // 1.
			if(output==""&&history!=""){ 
				if(isNaN(history[history.length-1])){  //if(NotaNumber(*)) --> In above case
					history= history.substr(0,history.length-1);
                    //case: If it's " 9*9* "  in history, and we pressed "-" it removes  last "*" and appends "-" using below 2.
				}
			}
            // 2.
			if(output!="" || history!=""){  
                //teritary operator
				output= output==""?output:reverseNumberFormat(output); //if not empty,take rev.format of num.
				history=history+output;
				if(this.id=="="){   
					var result=eval(history); //evaluate history
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;  //append
					printHistory(history);
					printOutput("");  //clear output
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput()); //"9"(4times) --> from 9,999 to 9999.
		if(output!=NaN){ //if output is a number
			output=output+this.id;  //concatenate
			printOutput(output);
		}
	});
}