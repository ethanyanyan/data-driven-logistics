# Backend Middleware

Middleware is any function that gets triggered before the 
server runs the code for a given route. For instance, in
the code below `requireAuth` is middleware.

```javascript
router.get("/profile", requireAuth, (req, res) => { ... }
```

Adding our authorization middleware into a route makes
that route protected, meaning that a user cannot
access the resources at that route without 
a valid auth token. We use JWT (JSON Web Tokens) for authorization because
it stores tokens on the client-side rather than on the
server, which would increase the complexity of our app.
Server-side token management can introduce drawbacks such as increased 
server load, scalability challenges, and potential bottlenecks in 
handling token-related operations. Storing tokens on the client-side 
with JWT helps mitigate these issues, allowing for a more scalable and responsive system.
