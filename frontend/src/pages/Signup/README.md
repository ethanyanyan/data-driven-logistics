# Signup Page

The `Signup` component in `index.js` is the overarching signup page.

The `SignupForm` component lets users create a new account.
The component defines state variables and other characteristics 
like placeholder text for the necessary fields. It also defines
onChange functions used by input fields and the form submit logic. 
The component is ignorant to the actual implementation of the form
fields.

The `FormField` component is embedded within the `Signup` component.
The component is responsible for selecting which type of input to 
render (such as `Default`, `RoleSelector`, or `CompanySearch`) based on the
`type` prop passed to it by its parent. It is esentially just a switch. Of note
here is that the component includes (visually hidden) labels because even though 
they aren't included in the design visually, it's best to include 
them on the site for better accessibility.

The components in the `components/inputs` define the input fields
the user interacts with to complete the form. Custom logic like
querying the backend to discover which roles are contained within
the database happen at this level.

For screenshots and more information on requirements and specifications, 
please visit `/docs/designs/signup`.
