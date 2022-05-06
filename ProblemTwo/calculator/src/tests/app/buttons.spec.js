import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../App';


describe("Calculator Buttons Tests", () => {
  var document;
  var calculator;
  var displayedText;

  beforeEach(() => {
    let {container} = render(<App />)
    document = container;
    displayedText = document.querySelector(".calculator-value");

    let buttons = document.querySelector(".calculator-buttons");
    calculator = {
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
  });

  test("If operators are pressed in succession, only the last one pressed is used", () => {
    const {three, seven, add, subtract, multiply, divide, equals} = calculator;

    fireEvent.click(seven);
    fireEvent.click(subtract);
    fireEvent.click(divide);
    fireEvent.click(add);
    fireEvent.click(multiply);
    fireEvent.click(three);
    fireEvent.click(equals);
    expect(displayedText).toHaveValue("21");
  });

  test("If the same operator is pressed, only 1 press is registered.", () => {
    const {three, seven, multiply, equals} = calculator;

    fireEvent.click(seven);
    fireEvent.click(multiply);
    fireEvent.click(multiply);
    fireEvent.click(multiply);
    fireEvent.click(three);
    fireEvent.click(equals);
    expect(displayedText).toHaveValue("21");
  });  

  test("If '.' is pressed multiple times, only first press of '.' is registered.", () => {
    const {seven, point, zero, one} = calculator;

    fireEvent.click(seven);
    fireEvent.click(point);
    fireEvent.click(zero);
    fireEvent.click(one);
    fireEvent.click(point);
    fireEvent.click(point);
    fireEvent.click(one);
    fireEvent.click(point);
    expect(displayedText).toHaveValue("7.011");
  });  
});