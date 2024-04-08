# Signup process

## Requirements
- Users should be able to enter their username, password, first name, last name, role, and company name from within a form.
- Attempting to submit the form with input that does not meet the specifications below should show an error message instructing the user on how to fix the issue(s).
- Submitting the form should create a new user with the specified data or should return an error message that instructs the user on what to do next. On successful submission, the user should be redirected to the login page.

## Specifications
- Username and password input fields should allow alphanumeric characters only. While allowing other characters would increase security, it would also mean that we would need to worry about data sanitization.
- Users must type their password again into the "confirm password" input field and this should match exactly what appears in the "password" input field.
- Usernames and passwords should be longer than 5 characters but shorter than 20.
- First name and last name should be shorter than 20 characters and start with a capital letter.
- Roles should be specified from a dropdown of all of the unique roles in our database. Only one role can be selected.
- Company name selection should use a search bar. Only one company can be selected.
