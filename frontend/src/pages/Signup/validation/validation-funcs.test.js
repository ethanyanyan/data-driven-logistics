import * as v from "."

test("notEmpty", () => {

    const testCases = [
        { input: "", expected: { isValid: false, errorMsg: "Cannot be empty" } },
        { input: " ", expected: { isValid: true, errorMsg: null } },
        { input: "Apple", expected: { isValid: true, errorMsg: null } },
        { input: "Hello world", expected: { isValid: true, errorMsg: null } },
    ];
    
    testCases.forEach((testCase) => {
        const { input, expected } = testCase;
        expect(v.notEmpty(input)).toEqual(expected);
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
        expect(v.minLength(input, MIN)).toEqual(expected);
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
        expect(v.maxLength(input, MAX)).toEqual(expected);
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
        expect(v.startsCapital(input)).toEqual(expected);
    });
})

test("alphaOnly", () => {

    const testCases = [
        { input: "", expected: { isValid: false, errorMsg: "Letters only" } },
        { input: " ", expected: { isValid: false, errorMsg: "Letters only" } },
        { input: "Hi", expected: { isValid: true, errorMsg: null } },
        { input: "Hi428", expected: { isValid: false, errorMsg: "Letters only" } }
    ];
    
    testCases.forEach((testCase) => {
        const { input, expected } = testCase;
        expect(v.alphaOnly(input)).toEqual(expected);
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
        expect(v.alphaNumericOnly(input)).toEqual(expected);
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
        expect(v.matchesTarget(...inputs)).toEqual(expected);
    });
    
})

test("matchesOneInList", () => {

    const testCases = [
        { inputs: ["hi", ["hi", "hello"]], expected: { isValid: true, errorMsg: null } },
        { inputs: ["hi", ["Hi", "bye", "hI"]], expected: { isValid: false, errorMsg: "Must match value in list" } },
        { inputs: ["hello124 ", ["hello124"]], expected: { isValid: false, errorMsg: "Must match value in list" } },
    ];
    
    testCases.forEach((testCase) => {
        const { inputs, expected } = testCase;
        console.log("Test case")
        console.log(inputs, expected)
        console.log("Got")
        console.log(v.matchesOneInList(...inputs))
        expect(v.matchesOneInList(...inputs)).toEqual(expected);
    });

})