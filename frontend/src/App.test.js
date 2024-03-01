// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders login page correctly", () => {
  render(<App />);
  // Check for something specific to the LoginPage. For example, the presence of the login form.
  const loginForm = screen.getByRole("button", { name: /login/i });
  expect(loginForm).toBeInTheDocument();

  // Optionally, check for inputs by their label text, which also tests accessibility.
  const usernameInput = screen.getByLabelText(/username/i);
  expect(usernameInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
});
