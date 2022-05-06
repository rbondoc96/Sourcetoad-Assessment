import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../App';


describe("Calculator Display Tests", () => {
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
          point: buttons.querySelector(".calculator-buttons-row:last-child .calculator-action-button"),
          equals: buttons.querySelector(".calculator-buttons-row:last-child .calculator-operator-button"),
        }
    });

  describe("Number Key Entries", () => {
    test("Each number is rendered to display", () => {
      const {zero, one, two, three, four, five, six, seven, eight, nine} = calculator;

      expect(displayedText).toHaveValue("0");
      fireEvent.click(one);
      expect(displayedText).toHaveValue("1");
      fireEvent.click(two);
      expect(displayedText).toHaveValue("12");
      fireEvent.click(three);
      expect(displayedText).toHaveValue("123");
      fireEvent.click(four);
      expect(displayedText).toHaveValue("1,234");
      fireEvent.click(five);
      expect(displayedText).toHaveValue("12,345");
      fireEvent.click(six);
      expect(displayedText).toHaveValue("123,456");
      fireEvent.click(seven);
      expect(displayedText).toHaveValue("1,234,567");
      fireEvent.click(eight);
      expect(displayedText).toHaveValue("12,345,678");
      fireEvent.click(nine);
      expect(displayedText).toHaveValue("123,456,789");
      fireEvent.click(zero);
      expect(displayedText).toHaveValue("1,234,567,890");
    });

    test("Renders 1 to display if 0 is pressed first", () => {
      const {zero, one} = calculator;
      
      fireEvent.click(zero);
      fireEvent.click(one);
      expect(displayedText).toHaveValue("1");
    });
  
    test("Renders 77 to display", () => {
      const {seven} = calculator;
      
      fireEvent.click(seven);
      fireEvent.click(seven);
      expect(displayedText).toHaveValue("77");
    });  
  });
  
  describe("Point '.' button function", () => {
    test("Renders 7.7 to display", () => {
      const {seven, point} = calculator;
      
      expect(seven).toBeInTheDocument();
      fireEvent.click(seven);
      fireEvent.click(point);
      fireEvent.click(seven);
      expect(displayedText).toHaveValue("7.7");
    }); 

    test("Does not display extra point", () => {
      const {seven, eight, point} = calculator;
      
      expect(seven).toBeInTheDocument();
      fireEvent.click(seven);
      fireEvent.click(point);
      expect(displayedText).toHaveValue("7.");
      fireEvent.click(point);
      fireEvent.click(point);
      expect(displayedText).toHaveValue("7.");
      fireEvent.click(seven);
      expect(displayedText).toHaveValue("7.7");
      fireEvent.click(point);
      expect(displayedText).toHaveValue("7.7");      
      fireEvent.click(eight);
      expect(displayedText).toHaveValue("7.78");
      fireEvent.click(point);
      expect(displayedText).toHaveValue("7.78");
    });     
  });

});
