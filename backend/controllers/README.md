# Controllers Directory

This directory contains all the controller files for the application. Controllers are responsible for handling incoming requests, performing operations on data, and sending responses back to the client.

## Structure

Controllers are organized by domain, similar to routes. Each file represents a different area of the application, such as `userController`, `productController`, etc. Inside each controller file, you'll find functions that correspond to different actions that can be performed on that domain's data.

## Example

An example function in `userController.js` might look like this:

```javascript
exports.listUsers = async (req, res) => {
  // Logic to list users
  res.send(users);
};
```
