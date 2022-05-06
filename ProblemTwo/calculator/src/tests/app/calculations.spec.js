import { fireEvent, render } from '@testing-library/react';
import App from '../../App';


describe("Calculator Calculations Tests", () => {
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


    test("1 + 1 = 2", () => {
        const {one, add, equals} = calculator;

        fireEvent.click(one);
        fireEvent.click(add);
        fireEvent.click(one);
        fireEvent.click(equals);
        expect(displayedText).toHaveValue("2");
    });

    test("2 - 1 = 1", () => {
        const {one, two, subtract, equals} = calculator;

        fireEvent.click(two);
        fireEvent.click(subtract);
        fireEvent.click(one);
        fireEvent.click(equals);
        expect(displayedText).toHaveValue("1");
    });    

    test("84 * 32 = 2,688", () => {
        const {two, three, four, eight, multiply, equals} = calculator;

        fireEvent.click(eight);
        fireEvent.click(four);
        fireEvent.click(multiply);
        fireEvent.click(three);
        fireEvent.click(two);
        fireEvent.click(equals);

        expect(displayedText).toHaveValue("2,688");
    });

    test("84 / 2 = 42", () => {
        const {two, four, eight, divide, equals} = calculator;

        fireEvent.click(eight);
        fireEvent.click(four);
        fireEvent.click(divide);
        fireEvent.click(two);
        fireEvent.click(equals);

        expect(displayedText).toHaveValue("42");
    });    

    test("Order of Operations: 3 + 6 * 3 - 4 + 25 * 4 = 117", () => {
        const {two, three, four, five, six, add, subtract, multiply, equals} = calculator;

        fireEvent.click(three);
        fireEvent.click(add);
        fireEvent.click(six);
        fireEvent.click(multiply);
        fireEvent.click(three);
        fireEvent.click(subtract);
        fireEvent.click(four);
        fireEvent.click(add);
        fireEvent.click(two);
        fireEvent.click(five);
        fireEvent.click(multiply);
        fireEvent.click(four);
        fireEvent.click(equals);

        expect(displayedText).toHaveValue("117");
    });

    test("7 + 2% = 7.14", () => {
        const {two, seven, percent, add, equals} = calculator;

        fireEvent.click(seven);
        fireEvent.click(add);
        fireEvent.click(two);
        fireEvent.click(percent);
        fireEvent.click(equals);

        expect(displayedText).toHaveValue("7.14");
    });

    test("7 + 2%%% = 7.000686", () => {
        const {two, seven, percent, add, equals} = calculator;

        fireEvent.click(seven);
        fireEvent.click(add);
        fireEvent.click(two);
        fireEvent.click(percent);
        fireEvent.click(percent);
        fireEvent.click(percent);
        fireEvent.click(equals);

        expect(displayedText).toHaveValue("7.000686");
    });  

    test("7 * 8% = 0.56", () => {
        const {seven, eight, percent, multiply, equals} = calculator;

        fireEvent.click(seven);
        fireEvent.click(multiply);
        fireEvent.click(eight);
        fireEvent.click(percent);
        fireEvent.click(equals);

        expect(displayedText).toHaveValue("0.56");
    });  

    test("7 * 8%%% = 0.000056", () => {
        const {seven, eight, percent, multiply, equals} = calculator;

        fireEvent.click(seven);
        fireEvent.click(multiply);
        fireEvent.click(eight);
        fireEvent.click(percent);
        fireEvent.click(percent);
        fireEvent.click(percent);
        fireEvent.click(equals);

        expect(displayedText).toHaveValue("0.000056");
    });
  
    test("1023 / 0 = ∞", () => {
        const {zero, one, two, three, divide, equals} = calculator;

        fireEvent.click(one);
        fireEvent.click(zero);
        fireEvent.click(two);
        fireEvent.click(three);
        fireEvent.click(divide);
        fireEvent.click(zero);
        fireEvent.click(equals);

        expect(displayedText).toHaveValue("∞");
    });

    test("-1 * -3 = 3", () => {
        const {one, three, multiply, negation, equals} = calculator;

        fireEvent.click(one);
        fireEvent.click(negation);
        fireEvent.click(multiply);
        fireEvent.click(three);
        fireEvent.click(negation);
        fireEvent.click(equals);

        expect(displayedText).toHaveValue("3");
    });
    
    test("-2 * ----3 = -6", () => {
        const {two, three, multiply, negation, equals} = calculator;

        fireEvent.click(two);
        fireEvent.click(negation);
        fireEvent.click(multiply);
        fireEvent.click(three);
        fireEvent.click(negation);
        fireEvent.click(negation);
        fireEvent.click(negation);
        fireEvent.click(negation);
        fireEvent.click(equals);

        expect(displayedText).toHaveValue("-6");
    });    
});
