import {useContext} from "react";
import {CalculatorContext} from "../context/CalculatorContext";

function CalculatorNumberButton({ number }) {
    const {
        SCREEN,
        EQUATION,
        HISTORY,
        RESULT,
    } = useContext(CalculatorContext);
    const [screenText, setScreenText] = SCREEN;
    const setEquation = EQUATION[1];
    const [history, setHistory] = HISTORY;
    const setResult = RESULT[1];


    const handleAnimationEnd = (event) => {
        const target = event.currentTarget;
        if(target.classList.contains("number-button-fade")) {
            target.classList.remove("number-button-fade");
        }
    }


    const handleClick = (event) => {
        const target = event.currentTarget;
        if(!target.classList.contains("number-button-fade")) {
            target.classList.add("number-button-fade");
        }


        // Replace screen text if 0 or if user just pressed an arithmetic operator
        if(history.currentOperand === "0" || history.operatorInFocus !== null) {
            setScreenText(number);
            setHistory(prevState => ({
                ...prevState, 
                currentOperand: number,
                lastPressedOperand: prevState.lastPressedOperand === null ? number : prevState.lastPressedOperand,
            }));
            setResult(null);

        } else if(history.lastPressedOperator === "=") {
            setScreenText(number);
            setHistory(prevState => ({
                ...prevState, 
                currentOperand: number,
                lastPressedOperand: number,
            }));
            setResult(null);
        } else {
            setScreenText(prevState => prevState + number);
            setHistory(prevState => ({
                ...prevState, 
                currentOperand: prevState.currentOperand + number,
                lastPressedOperand: prevState.currentOperand + number
            }));
        }

        setHistory(prevState => ({
            ...prevState,
            operatorInFocus: null,
        }));
    };

    return(
        <button className="calculator-button" onClick={handleClick} onAnimationEnd={handleAnimationEnd}>
            {number}
        </button>
    );    
}

export default CalculatorNumberButton;
