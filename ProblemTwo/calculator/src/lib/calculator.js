function hasHigherPrecedence(leftOp, rightOp) {
    // MD: multiplication, division, percent
    // AS: addition, subtraction
    const leftIsMD = leftOp === "*" || leftOp === "/";
    const leftIsAS = leftOp === "+" | leftOp === "-";
    const rightIsMD = rightOp === "*" || rightOp === "/";
    const rightIsAS = rightOp === "+" | rightOp === "-";

    if(leftIsMD || (leftIsAS && rightIsAS)) {
        return true;
    } else if(rightIsMD && leftIsAS) {
        return false;
    }
}

function infixToPostfix(expression) {
    const opStack = [];
    const postFixExpr = [];

    for(let c of expression) {
        if(!isNaN(parseFloat(c))) { 
            postFixExpr.push(c); 
        } else if(c === "+" || c === "-" || c === "*" || c === "/") {
            if(opStack.length === 0) {
                opStack.push(c);
            } else {
                var top = opStack[opStack.length - 1];
                while(opStack.length > 0 && hasHigherPrecedence(top, c)) {
                    postFixExpr.push(opStack.pop());
                    top = opStack[opStack.length - 1];
                }
                opStack.push(c);
            }
        }
    }
    while(opStack.length > 0) {
        postFixExpr.push(opStack.pop());
    }

    return postFixExpr;
}

function calculate(expression) {
    const postFixExpr = infixToPostfix(expression);
    const stack = [];

    for(let c of postFixExpr) {
        if(isNaN(parseFloat(c))) {
            let y = stack.pop();
            let x = stack.pop();

            switch(c) {
                case "+":
                    x = parseFloat(x);
                    if(y[y.length-1] === "%") {
                        y = x * (parseFloat(y) / 100); 
                    } else {
                        y = parseFloat(y)
                    }
                    stack.push(x + y);
                    break;
                case "-":
                    if(y[y.length-1] === "%") {
                        y = x * (parseFloat(y) / 100); 
                    } else {
                        y = parseFloat(y)
                    }                 
                    stack.push(x - y);
                    break;
                case "*":
                    x = parseFloat(x);
                    if(y[y.length-1] === "%") {
                        y = parseFloat(y) / 100; 
                    } else {
                        y = parseFloat(y);
                    }                    
                    stack.push(x * y);
                    break;
                case "/":
                    x = parseFloat(x);
                    if(y[y.length-1] === "%") {
                        y = parseFloat(y) / 100; 
                    } else {
                        y = parseFloat(y);
                    }                                        
                    stack.push(x / y);
                    break;
                default:
                    break;
            }
        } else {
            stack.push(c);
        }
    }

    return parseFloat(stack[0]);
}

export {infixToPostfix, calculate};