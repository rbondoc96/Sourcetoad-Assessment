import {useContext} from "react";
import {CalculatorContext} from "../context/CalculatorContext";

import CalculatorNumberButton from "./CalculatorNumberButton";
import CalculatorOperatorButton from "./CalculatorOperatorButton";
import CalculatorActionButton from "./CalculatorActionButton";


function CalculatorButtons() {
    const {EQUATION, HISTORY} = useContext(CalculatorContext);
    const equation = EQUATION[0];
    const history = HISTORY[0];

    return(
        <div className="calculator-buttons">
            <div className="calculator-buttons-row">
                <CalculatorActionButton action={equation.length === 0 ? "AC" : "C"} />
                <CalculatorActionButton action={"+/-"} />
                <CalculatorActionButton action={"%"} />
                <CalculatorOperatorButton 
                    inFocus={history.operatorInFocus === "/"} operator={"/"} children={"÷"} />
            </div>
            <div className="calculator-buttons-row">
                <CalculatorNumberButton number={"7"} />
                <CalculatorNumberButton number={"8"} />
                <CalculatorNumberButton number={"9"} />
                <CalculatorOperatorButton 
                    inFocus={history.operatorInFocus === "*"} operator={"*"} children={"x"} />
            </div>
            <div className="calculator-buttons-row">
                <CalculatorNumberButton number={"4"} />
                <CalculatorNumberButton number={"5"} />
                <CalculatorNumberButton number={"6"} />
                <CalculatorOperatorButton 
                    inFocus={history.operatorInFocus === "-"} operator={"-"} children={"–"} />
            </div>
            <div className="calculator-buttons-row">
                <CalculatorNumberButton number={"1"} />
                <CalculatorNumberButton number={"2"} />
                <CalculatorNumberButton number={"3"} />
                <CalculatorOperatorButton 
                    inFocus={history.operatorInFocus === "+"} operator={"+"} children={"+"} />
            </div>            
            <div className="calculator-buttons-row">
                <CalculatorNumberButton number={"0"} />
                <CalculatorActionButton action={"."} />
                <CalculatorOperatorButton operator={"="} children={"="} />
            </div>
        </div>
    );
}

export default CalculatorButtons;
