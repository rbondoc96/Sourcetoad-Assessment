import {useContext} from "react";
import {CalculatorContext} from "../context/CalculatorContext";

import {calculate} from "../lib/calculator";

function CalculatorOperatorButton({ operator, inFocus, children }) {
    const {
        SCREEN,
        EQUATION,
        HISTORY,
        RESULT,
    } = useContext(CalculatorContext);
    const setScreenText = SCREEN[1];
    const [equation, setEquation] = EQUATION;
    const [history, setHistory] = HISTORY;
    const [result, setResult] = RESULT;


    const handleEqualsOperator = (elem) => {
        if(!elem.classList.contains("operator-button-fade")) {
            elem.classList.add("operator-button-fade");
        }

        var secondOperand = null;
        var eqn = null;

        // Handles subsequent "=" presses after first "="
        if(result) {
            secondOperand = history.currentOperand === null ? result : history.currentOperand;
            eqn = [...equation, history.lastPressedArithmeticOperator, secondOperand];
        } else {
            secondOperand = history.currentOperand === null ? history.lastPressedOperand : history.currentOperand;
            eqn = [...equation, secondOperand];
        }

        const res = String(parseFloat(calculate(eqn).toFixed(12)));
        setResult(res);
        setScreenText(res);  
        setEquation([res]);
        setHistory(prevState => ({
            ...prevState,
            lastPressedOperand: res,
            lastPressedOperator: operator,
            operatorInFocus: null,
        }));       
    };

    const handleArithmeticOperator = () => {
        // Handle case where multiple arithmetic operators are pressed consecutively
        if(history.operatorInFocus !== null && history.operatorInFocus !== operator) {
            setHistory(prevState => ({
                ...prevState,
                operatorInFocus: operator,
                lastPressedOperator: operator,
                lastPressedArithmeticOperator: operator,
            }));
            setEquation(prevState => [...prevState.slice(0, prevState.length - 1), operator]);
        } else {
            // Handles chaining more calculations after a result
            if(result) {
                setEquation([result, operator]);
                setHistory(prevState => ({
                    ...prevState,
                    lastPressedOperand: result,
                    currentOperand: null,
                    lastPressedOperator: operator,
                    lastPressedArithmeticOperator: operator,
                    operatorInFocus: operator,
                }));
            } else {    
                /**
                 * Condition in lastPressedOperand preserves lastPressedOperand if user presses 
                 * operator buttons consecutively before choosing the next operand
                 * Ex: [7] [+] [-] [*] [/] [2] ---> registers [/] as the final operator and preserves '7'
                 */
                setEquation(prevState => [...prevState, history.currentOperand, operator]);
                setHistory(prevState => ({
                    lastPressedOperand: prevState.currentOperand === null ? prevState.lastPressedOperand : prevState.currentOperand,
                    currentOperand: null,
                    lastPressedOperator: operator,
                    lastPressedArithmeticOperator: operator,
                    operatorInFocus: operator,
                })); 
            }
        }
    };

    const handleAnimationEnd = (event) => {
        if(operator === "=") {
            const target = event.currentTarget;
            if(target.classList.contains("operator-button-fade")) {
                target.classList.remove("operator-button-fade");
            }
        }
    };


    const handleClick = (event) => {
        switch(operator) {
            case "=":
                handleEqualsOperator(event.currentTarget);
                break;
            case "/":
            case "*":
            case "-":
            case "+":
                if(history.operatorInFocus !== operator) {
                    handleArithmeticOperator();
                }
                break;
            default:
                break;
        }
    };
    

    const cssClasses = ["calculator-operator-button"];
    if(inFocus) {
        cssClasses.push("calculator-operator-button--focused");
    }

    return(
        <button className={cssClasses.join(" ")} onClick={handleClick} onAnimationEnd={handleAnimationEnd}>
            {children}
        </button>
    );    
}

export default CalculatorOperatorButton;
