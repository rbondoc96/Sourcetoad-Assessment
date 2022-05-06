import {CalculatorContextProvider} from "./context/CalculatorContext"

import Calculator from "./components/Calculator";
import StatusBar from "./components/StatusBar";

import './styles/App.css';
import { useEffect } from "react";

function App() {

  const handleKeyboardPress = event => {
    const keyPressed = event.code
    const shiftHeld = event.shiftKey;

    const buttons = document.querySelector(".calculator-buttons");
    const calculator = {
      zero: buttons.querySelector(".calculator-buttons-row:last-child .calculator-button"),
      one: buttons.querySelector(".calculator-buttons-row:nth-child(4) .calculator-button:first-child"),
      two: buttons.querySelector(".calculator-buttons-row:nth-child(4) .calculator-button:nth-child(2)"),
      three: buttons.querySelector(".calculator-buttons-row:nth-child(4) .calculator-button:nth-child(3)"),
      four: buttons.querySelector(".calculator-buttons-row:nth-child(3) .calculator-button:first-child"),
      five: buttons.querySelector(".calculator-buttons-row:nth-child(3) .calculator-button:nth-child(2)"),
      six: buttons.querySelector(".calculator-buttons-row:nth-child(3) .calculator-button:nth-child(3)"),
      seven: buttons.querySelector(".calculator-buttons-row:nth-child(2) .calculator-button:first-child"),
      eight: buttons.querySelector(".calculator-buttons-row:nth-child(2) .calculator-button:nth-child(2)"),
      nine: buttons.querySelector(".calculator-buttons-row:nth-child(2) .calculator-button:nth-child(3)"),
      add: buttons.querySelector(".calculator-buttons-row:nth-child(4) .calculator-operator-button"),
      subtract: buttons.querySelector(".calculator-buttons-row:nth-child(3) .calculator-operator-button"),
      multiply: buttons.querySelector(".calculator-buttons-row:nth-child(2) .calculator-operator-button"),
      divide: buttons.querySelector(".calculator-buttons-row:first-child .calculator-operator-button"),
      equals: buttons.querySelector(".calculator-buttons-row:last-child .calculator-operator-button"),
      point: buttons.querySelector(".calculator-buttons-row:last-child .calculator-action-button"),
      negation: buttons.querySelector(".calculator-buttons-row:first-child .calculator-action-button:nth-child(2)"),
      percent: buttons.querySelector(".calculator-buttons-row:first-child .calculator-action-button:nth-child(3)"),
      clear: buttons.querySelector(".calculator-buttons-row:first-child .calculator-action-button:first-child"),
    };    

    switch(keyPressed) {
      case "Digit0":
        calculator.zero.click();
        break;
      case "Digit1":
        calculator.one.click();
        break;
      case "Digit2":
        calculator.two.click();
        break;
      case "Digit3":
        calculator.three.click();
        break;
      case "Digit4":
        calculator.four.click();
        break;
      
      // '5' or '%'
      case "Digit5":
        if(shiftHeld) {
          calculator.percent.click();
        } else {
          calculator.five.click();
        }
        break;
      case "Digit6":
        calculator.six.click();
        break;
      case "Digit7":
        calculator.seven.click();
        break;
      // '8' or multiply
      case "Digit8":
        if(shiftHeld) {
          calculator.multiply.click();
        } else {
          calculator.eight.click();
        }
        break;
      case "Digit9":
        calculator.nine.click();
        break;
      case "Period":
        calculator.point.click();
        break;
      case "KeyC":
        calculator.clear.click();
        break;

      // Negation or minus
      case "Minus":
        if(shiftHeld) {
          calculator.negation.click();
        } else {
          calculator.subtract.click();
        }
        break;
      case "Slash":
        calculator.divide.click();
        break;

      // equals or plus
      case "Equal":
        if(shiftHeld) {
          calculator.add.click();
        } else {
          calculator.equals.click();
        }
        break;
      case "Enter": 
        calculator.equals.click();
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardPress);

    return () => {
      window.removeEventListener("keydown", handleKeyboardPress);
    }
  }, []);

  return (
    <div className="App">
      <StatusBar />
      <CalculatorContextProvider>
        <Calculator />
      </CalculatorContextProvider>
    </div>
  );
}

export default App;
