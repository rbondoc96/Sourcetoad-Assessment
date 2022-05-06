import {infixToPostfix, calculate} from "../../lib/calculator";

// TODO: Remove tests for "%", do in a different commit or branch in case I want it

describe("Infix to Postfix tests", () => {
    test("1+2*3+1", () => {
        const expression = ["1", "+", "2", "*", "3", "+", "1"];
        const targetResult = ["1", "2", "3", "*", "+", "1", "+"];
        const result = infixToPostfix(expression);
        
        expect(result).toStrictEqual(targetResult);
    });

    test("7*7%", () => {
        const expression = ["7", "*", "7%"];
        const targetResult = ["7", "7%", "*"];
        const result = infixToPostfix(expression);

        expect(result).toStrictEqual(targetResult);
    });    

    test("8+2+10%", () => {
        const expression = ["8", "+", "2", "+", "10%"];
        const targetResult = ["8", "2", "+", "10%", "+"];
        const result = infixToPostfix(expression);
        
        expect(result).toStrictEqual(targetResult);        
    });

    test("1+2*3-4*5", () => {
        const expression = ["1", "+", "2", "*", "3", "-", "4", "*", "5"];
        const targetResult = ["1", "2", "3", "*", "+", "4", "5", "*", "-"];
        const result = infixToPostfix(expression);
        
        expect(result).toStrictEqual(targetResult);        
    });
    
    test("34*2431-8", () => {
        const expression = ["34", "*", "2431", "-", "8"];
        const targetResult = ["34", "2431", "*", "8", "-"];
        const result = infixToPostfix(expression);
        
        expect(result).toStrictEqual(targetResult);        
    });      

    test("34*2431-8*72*50%", () => {
        const expression = ["34", "*", "2431", "-", "8", "*", "72", "*", "50%"];
        const targetResult = ["34", "2431", "*", "8", "72", "*", "50%", "*", "-"];
        const result = infixToPostfix(expression);
        
        expect(result).toStrictEqual(targetResult);        
    });     
});


describe("Calculator tests", () => {

    test("1", () => {
        const expression = ["1"];
        const targetResult = 1;
        const result = calculate(expression);

        expect(result).toBe(targetResult);
    });
    
    test("1+2*3+1", () => {
        const expression = ["1", "+", "2", "*", "3", "+", "1"];
        const targetResult = 8;
        const result = calculate(expression);

        expect(result).toBe(targetResult);
    });

    test("1+2*3-4*5", () => {
        const expression = ["1", "+", "2", "*", "3", "-", "4", "*", "5"];
        const targetResult = -13;
        const result = calculate(expression);

        expect(result).toBe(targetResult);
    }); 
    
    test("8+2+10%", () => {
        const expression = ["8", "+", "2", "+", "10%"];
        const targetResult = 11;
        const result = calculate(expression);

        expect(result).toBe(targetResult);
    });
    
    test("8*2+10%", () => {
        const expression = ["8", "*", "2", "+", "10%"];
        const targetResult = 17.6;
        const result = calculate(expression);

        expect(result).toBe(targetResult);
    });      

    test("8*7%", () => {
        const expression = ["8", "*", "7%"];
        const targetResult = 0.56;
        const result = calculate(expression);

        expect(result).toBe(targetResult);
    });

    test("8*7%", () => {
        const expression = ["8", "*", "7%"];
        const targetResult = 0.56;
        const result = calculate(expression);

        expect(result).toBe(targetResult);
    });    
    
    test("34*2431-8*72*50%", () => {
        const expression = ["34", "*", "2431", "-", "8", "*", "72", "*", "50%"];
        const targetResult = 82366;
        const result = calculate(expression);

        expect(result).toBe(targetResult);
    });

    test("3+2117/57.45*1.35+5%", () => {
        const expression = ["3", "+", "2117", "/", "57.45", "*", "1.35"];
        const targetResult = 3 + (2117 / 57.45) * 1.35;
        const result = calculate(expression);

        expect(result).toBe(targetResult);
    });        

    test("3+2117/57.45*1.35+5%", () => {
        const expression = ["3", "+", "2117", "/", "57.45", "*", "1.35", "+", "5%"];
        var targetResult = 3 + (2117 / 57.45) * 1.35;
        targetResult = targetResult + (targetResult * 5) / 100;
        const result = calculate(expression);

        expect(result).toBe(targetResult);
    });   
    
    test("2*300-5/10+0.25*50/5+1", () => {
        const expression = ["2", "*", "300", "-", "5", "/", "10", "+", "0.25", "*", "50", "/", "5", "+", "1"];
        const targetResult = (2 * 300) - (5 / 10) + (0.25 * 50 / 5) + 1;
        const result = calculate(expression);

        expect(result).toBe(targetResult);
    }); 
    
    test("2*300-5/10+0.25*50/5+1+10%", () => {
        const expression = ["2", "*", "300", "-", "5", "/", "10", "+", "0.25", "*", "50", "/", "5", "+", "1", "+", "10%"];
        var targetResult = (2 * 300) - (5 / 10) + (0.25 * 50 / 5) + 1;
        targetResult = targetResult + (targetResult * 10) / 100;        
        const result = calculate(expression);

        expect(result).toBe(targetResult);
    });     
});