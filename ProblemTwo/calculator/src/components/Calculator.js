import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorButtons from "./CalculatorButtons";

import "../styles/calculator.css";

function Calculator() {
    return(
        <div className="calculator">
            <CalculatorDisplay />
            <CalculatorButtons />
        </div>
    );
}

export default Calculator;