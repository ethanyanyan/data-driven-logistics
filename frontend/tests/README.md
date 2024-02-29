# Frontend testing documentation

To start, make sure you've got all node packages installed. 
Then, run 

```
npm test
```

This window will show the interactive interface for tests 
with Jest and React Testing Library (RTL). 

## Writing tests

Here are some things you should be testing when you write a component

- Tests should be in the same folder as the component they test. For instance, the test file for `frontend/src/components/MyComponent.js` should be `frontend/src/components/MyComponent.test.js`
- Ensure the component renders without errors
- Verify that the component correctly handles different prop types and responds to prop changes
- Test event handling and user input
- Check the initialization of state and how the component handles state changes
- Implement basic error boundary tests to ensure the component gracefully handles errors
- Test the component with extreme values and edge cases

## Best practices

- Each test should be independent and not rely on the state of other tests.
- Write clear and descriptive test names to understand the purpose of each test.
- Use mocking to isolate components and services like API calls (see `example` directory)
