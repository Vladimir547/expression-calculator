function eval() {
    // Do not use eval!!!
    return;
}
function parseString (str) {
    let part = '';
    let parts = [];
    let previous = '';
    let value = '';
    for (let i = 0; i < str.length; i++){
        value = str[i];
        switch(value){
            case '+':
            case '-':
            case '*':
            case '/':
            case '(':
            case ')':
                if(part){
                    parts.push(part);
                    part = '';
                }
                parts.push(value);
                break;
            case ' ':
                if(part){
                    parts.push(part);
                    part = '';	
                }
                break;
            default:
                part += value;
        }
        
        //previous = value;
    }
    if(part){
        parts.push(part);
    }
    return parts;
} 
function ReversePolishNotation (arr) {
    let output = [];
    let operator = '';
    let value = '';
    let arrayOfOperator = [];
    for(let i = 0; i < arr.length; i++){
        value = arr[i];
        switch(value){
            case '-':
            case '+':
                if(arrayOfOperator.length){
                    operator = arrayOfOperator.pop();
                    while(operator && operator != '('){
                        output.push(operator);
                        operator = arrayOfOperator.pop();
                    }
                    if(operator){
                        arrayOfOperator.push(operator);
                    }
                }
                arrayOfOperator.push(value);
                break;
            case '*':
            case '/':
                if(arrayOfOperator.length){
                    operator = arrayOfOperator.pop();
                    while(operator && operator != '(' && operator != '+' && operator != '-'){
                        output.push(operator);
                        operator = arrayOfOperator.pop()
                    }
                    if(operator){
                        arrayOfOperator.push(operator);
                    }
                }
                arrayOfOperator.push(value);
                break;
            case '(':
                arrayOfOperator.push(value);
                break;
            case ')':
                if(arrayOfOperator.length){
                    operator = arrayOfOperator.pop();
                    while(operator != '('){
                        if (!operator) {
                            throw new Error("ExpressionError: Brackets must be paired");
                        }
                        output.push(operator);
                        operator = arrayOfOperator.pop()
                    }
                    /*if(operator){
                        arrayOfOperator.push(operator);
                    }*/
                }
                //arrayOfOperator.push(value);
                break;
            default:
                output.push(value);
        }
    }
    while(arrayOfOperator.length){
        output.push(arrayOfOperator.pop());
    }
    return output;
}
function calc (rpn) {
    let a,b;
    let value = '';
    let result = [];
    for(let i = 0; i < rpn.length; i++){
        value = rpn[i];
        switch(value){
            case '+':
                b = result.pop();
                a = result.pop();
                result.push(Number(a) + Number(b));
                break;
            case '-':
                b = result.pop();
                a = result.pop();
                result.push(Number(a) - Number(b));
                break;
            case '/':
                b = result.pop();
                a = result.pop();
                if( b == 0){
                    throw new Error('TypeError: Division by zero.');
                }
                result.push(a / b);
                break;
            case '*':
                b = result.pop();
                a = result.pop();
                result.push(a * b);
                break;
            default:
                result.push(value);
        }
    }
    return   result[0].toFixed(4);
}
function expressionCalculator(expr) {
    let parse = parseString (expr);
    let rpn = ReversePolishNotation (parse);
    let result = calc (rpn);
    return Number(result);
}

module.exports = {
    expressionCalculator
}