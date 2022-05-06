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
    const [screenText, setScreenText] = SCREEN;
    const [equation, setEquation] = EQUATION;
    const [history, setHistory, INITIAL_HISTORY] = HISTORY;
    const [result, setResult] = RESULT;


    const handleEqualsOperator = (elem) => {
        if(!elem.classList.contains("operator-button-fade")) {
            elem.classList.add("operator-button-fade");
        }

        var secondOperand = null;
        var eqn = null;

        // Handles subsequent "=" presses after first "=" press
        if(result) {
            secondOperand = history.currentOperand === null ? result : history.currentOperand;
            eqn = [...equation, history.lastPressedArithmeticOperator, secondOperand];
        } else {
            secondOperand = history.currentOperand === null ? history.lastPressedOperand : history.currentOperand;
            // equation = [history.lastOperand, history.lastPressedArithmeticOperator, secondOperand];

            // Push secondOperand to end of eqn before calculation
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

        // var _equation = [];

        // // Track the last operand for subsequent "=" presses
        // if(!result) {
        //     setHistory(prevState => ({...prevState, lastOperand: screenText}));
        //     _equation = [...equation, screenText];

        // // Behavior for subsequent "=" presses
        // } else {
        //     _equation = [...equation, history.lastPressedArithmeticOperator, history.lastOperand];
        // }

        // // Constrain to 12 decimal places and then remove trailing 0's
        // const res = parseFloat(calculate(_equation).toFixed(12));
        // setResult(res);
        // setScreenText(String(res));
        // setEquation(_equation);  
        // setHistory(prevState => ({
        //     ...prevState,
        //     operandInFocus: String(res),
        //     lastPressedOperator: operator,
        // })); 
    };

    const handleArithmeticOperator = () => {
        // Implements chaining of further calculations after a result
        // Case where operator is pressed right after "=" is pressed

        // Use operatorInFocus === null, a number was just pressed
        if(history.operatorInFocus !== null && history.operatorInFocus !== operator) {
            // Change focus to the operator that was just pressed
            setHistory(prevState => ({
                ...prevState,
                operatorInFocus: operator,
                lastPressedOperator: operator,
                lastPressedArithmeticOperator: operator,
            }));
            // Remove the operator last added to the equation
            setEquation(prevState => [...prevState.slice(0, prevState.length - 1), operator]);
        } else {
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
                // Reset result since it's saved in the equation
                // setResult(null);
            } else {
                // setEquation(prevState => [...prevState, screenText, operator]);
    
                /**
                 * Condition in lastPressedOperand covers situation where user presses operator buttons consecutively
                 * Ex: [7] [+] [-] [*] [/] ---> registers [/] as the final operator, and keeps '7'
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

        // setHistory(prevState => ({
        //     lastOperand: prevState.currentOperand,
        //     currentOperand: null,
        //     lastPressedOperator: operator,
        //     lastPressedArithmeticOperator: operator,
        //     operatorInFocus: operator,
        // }));       

        // Capture the operand on the screen before the operator was pressed
        // setHistory(prevState => ({
        //     ...prevState, 
        //     lastOperand: screenText,
        //     lastPressedOperator: operator,
        //     lastPressedArithmeticOperator: operator,
        //     operatorInFocus: operator,
        // }));
    };

    const handleAnimationEnd = (event) => {
        if(operator === "=") {
            const target = event.currentTarget;
            if(target.classList.contains("operator-button-fade")) {
                target.classList.remove("operator-button-fade");
            }
        }
    }


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
