import * as validation from "."

test("notEmpty", () => {

    const testCases = [
        { input: "", expected: { isValid: false, errorMsg: "Cannot be empty" } },
        { input: " ", expected: { isValid: true, errorMsg: null } },
        { input: "Apple", expected: { isValid: true, errorMsg: null } },
        { input: "Hello world", expected: { isValid: true, errorMsg: null } },
    ];
    
    testCases.forEach((testCase) => {
        const { input, expected } = testCase;
        expect(validation.notEmpty(input)).toEqual(expected);
    });
})

test("minLength", () => {

    const MIN = 5;
    const testCases = [
        { input: " ", expected: { isValid: false, errorMsg: "Must be longer than 5 characters" } },
        { input: "Pear", expected: { isValid: false, errorMsg: "Must be longer than 5 characters" } },
        { input: "Hello world", expected: { isValid: true, errorMsg: null } },
    ];
    
    testCases.forEach((testCase) => {
        const { input, expected } = testCase;
        expect(validation.minLength(input, MIN)).toEqual(expected);
    });
})

test("maxLength", () => {
    
    const MAX = 20;
    const testCases = [
        { input: " ", expected: { isValid: true, errorMsg: null } },
        { input: "Hello world", expected: { isValid: true, errorMsg: null } },
        { input: "Hello world this is a new day", expected: { isValid: false, errorMsg: "Must be shorter than 20 characters" } },
    ];
    
    testCases.forEach((testCase) => {
        const { input, expected } = testCase;
        expect(validation.maxLength(input, MAX)).toEqual(expected);
    });
})

test("startsCapital", () => {
    
    const testCases = [
        { input: "", expected: { isValid: false, errorMsg: "Must start with capital letter" } },
        { input: "hello", expected: { isValid: false, errorMsg: "Must start with capital letter" } },
        { input: "Hello world", expected: { isValid: true, errorMsg: null } },
    ];
    
    testCases.forEach((testCase) => {
        const { input, expected } = testCase;
        expect(validation.startsCapital(input)).toEqual(expected);
    });
})

test("alphaNumericOnly", () => {

    const testCases = [
        { input: "", expected: { isValid: false, errorMsg: "Alphanumeric characters only" } },
        { input: " ", expected: { isValid: false, errorMsg: "Alphanumeric characters only" } },
        { input: "Hi428", expected: { isValid: true, errorMsg: null } },
        { input: "H3ll0 w0rld", expected: { isValid: false, errorMsg: "Alphanumeric characters only" } },
        { input: "H3ll0?", expected: { isValid: false, errorMsg: "Alphanumeric characters only" } },
    ];
    
    testCases.forEach((testCase) => {
        const { input, expected } = testCase;
        expect(validation.alphaNumericOnly(input)).toEqual(expected);
    });

})

test("matchesTarget", () => {

    const testCases = [
        { inputs: ["", ""], expected: { isValid: true, errorMsg: null } },
        { inputs: ["hi", "Hi"], expected: { isValid: false, errorMsg: "Does not match" } },
        { inputs: ["hello ", "hello "], expected: { isValid: true, errorMsg: null } },
    ];
    
    testCases.forEach((testCase) => {
        const { inputs, expected } = testCase;
        expect(validation.matchesTarget(...inputs)).toEqual(expected);
    });
    
})
