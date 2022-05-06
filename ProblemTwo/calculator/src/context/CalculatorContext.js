import {createContext, useState} from "react";

const CalculatorContext = createContext();

function CalculatorContextProvider({ children }) {

    const INITIAL_HISTORY = {
        lastPressedOperand: null,
        lastPressedOperator: null,
        lastPressedArithmeticOperator: null,
        currentOperand: "0",
        operatorInFocus: null,
    }

    const [screenText, setScreenText] = useState("0");
    const [equation, setEquation] = useState([]);
    const [history, setHistory] = useState(INITIAL_HISTORY);
    const [result, setResult] = useState(null);

    return(
        <CalculatorContext.Provider value={{
            SCREEN: [screenText, setScreenText],
            EQUATION: [equation, setEquation],
            HISTORY: [history, setHistory, INITIAL_HISTORY],
            RESULT: [result, setResult],
        }}>
            {children}
        </CalculatorContext.Provider>
    )
}

export {CalculatorContextProvider, CalculatorContext};