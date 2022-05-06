import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../App';


describe("Special Calculator Action Tests", () => {
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

    test("Pressing '=' multiple times applies the last operator and last operand to the result", () => {
        const {three, multiply, equals} = calculator;

        // 3 * 3 = = = --> 81
        fireEvent.click(three);
        fireEvent.click(multiply);
        fireEvent.click(three);
        fireEvent.click(equals);
        fireEvent.click(equals);
        fireEvent.click(equals);

        expect(displayedText).toHaveValue("81");
    });
    
    test("Chaining calculations after initial result", () => {
        const {one, two, six, add, subtract, multiply, equals} = calculator;

        // 3 * 3 = = = --> 81
        fireEvent.click(two);
        fireEvent.click(add);
        fireEvent.click(two);
        fireEvent.click(equals);
        fireEvent.click(multiply);
        fireEvent.click(two);
        fireEvent.click(six);
        fireEvent.click(equals);
        fireEvent.click(subtract);
        fireEvent.click(one);
        fireEvent.click(equals);

        expect(displayedText).toHaveValue("103");
    });     
});