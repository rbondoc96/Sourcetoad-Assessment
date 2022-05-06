import {useContext} from "react";
import {CalculatorContext} from "../context/CalculatorContext";

function CalculatorActionButton({ action }) {
    const {
        SCREEN,
        EQUATION,
        HISTORY,
        RESULT,
    } = useContext(CalculatorContext);
    const setScreenText = SCREEN[1];
    const setEquation = EQUATION[1];
    const [history, setHistory, INITIAL_HISTORY] = HISTORY;
    const setResult = RESULT[1];


    const resetCalculator = () => {
        setScreenText("0");
        setEquation([]);
        setHistory(INITIAL_HISTORY);
        setResult(null);
    };

    const negateOperand = () => {
        if(history.currentOperand) {
            setHistory(prevState => {
                var operand;
    
                if(prevState.currentOperand[0] !== "-") {
                    operand = "-" + prevState.currentOperand;
                } else {
                    operand = prevState.currentOperand.substring(1, prevState.currentOperand.length);
                }
                setScreenText(operand);
                return {
                    ...prevState,
                    currentOperand: operand,
                };
            });
        }
    };

    const handlePercents = () => {
        // For (+) and (-), % is a percentage of lastPressedOperand mult. by the currentOperand in focus
        if(history.lastPressedOperator === "+" || history.lastPressedOperator === "-") {
            setHistory(prevState => {
                const converted = String(parseFloat(
                    (history.lastPressedOperand * history.currentOperand / 100).toFixed(12)
                ));    
                setScreenText(converted);
                return {
                    ...prevState,
                    currentOperand: converted,
                };
            });
        } else if(history.currentOperand) {
            setHistory(prevState => {
                const converted = String(parseFloat(
                    (history.currentOperand / 100).toFixed(12)
                ));    
                setScreenText(converted);
                return {
                    ...prevState,
                    currentOperand: converted,
                };
            });
        }
    };

    const addDecimalPoint = () => {
        if(history.currentOperand && !history.currentOperand.includes(".")) {
            setHistory(prevState => {
                const ptOperand = prevState.currentOperand + ".";

                setScreenText(ptOperand);

                return {
                    ...prevState,
                    currentOperand: ptOperand,
                };
            });
        }      
    };
    
    const handleAnimationEnd = (event) => {
        const target = event.currentTarget;
        if(target.classList.contains("action-button-fade")) {
            target.classList.remove("action-button-fade");
        }
    };

    const handleClick = (event) => {
        const target = event.currentTarget;
        if(!target.classList.contains("action-button-fade")) {
            target.classList.add("action-button-fade");
        }

        switch(action) {
            case "AC":
            case "C":
                resetCalculator();
                break;
            case "+/-":
                negateOperand();
                break;
            case "%":
                handlePercents();
                break;
            case ".":
                addDecimalPoint();
                break;
            default:
                break;
        }
    };

    return(
        <button className="calculator-action-button" onClick={handleClick} onAnimationEnd={handleAnimationEnd}>
            {action}
        </button>
    );    
}

export default CalculatorActionButton;
