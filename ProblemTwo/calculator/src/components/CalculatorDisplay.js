import {useContext} from "react";
import {CalculatorContext} from "../context/CalculatorContext";

function CalculatorDisplay() {
    const {SCREEN} = useContext(CalculatorContext)
    const screenText = SCREEN[0];

    const parsed = parseFloat(screenText);
    const formattedText = parsed >= 1000 || parsed <= -1000
         ? parseFloat(screenText).toLocaleString() : screenText;

    // Change font-size depending on number of characters
    const fontSize = 84 - (2.75 * screenText.length);
    const textStyle = {
        fontSize: `${fontSize}px`
    };

    return(
        <div className="calculator-display">
            <input type="text" className="calculator-value" value={formattedText} disabled={true}
                style={textStyle}
            />
        </div>
    );
}

export default CalculatorDisplay;