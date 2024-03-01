// src/tests/LoginForm.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import * as userService from "../../services/userService";

// Create a mock navigate function
const mockNavigate = jest.fn();

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock the login function from userService
jest.mock("../../services/userService", () => ({
  login: jest.fn(),
}));

describe("LoginForm Component", () => {
  beforeEach(() => {
    userService.login.mockClear();
    mockNavigate.mockClear();
  });

  it("renders correctly", () => {
    render(<LoginForm />, { wrapper: BrowserRouter });
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("allows a user to log in successfully", async () => {
    userService.login.mockResolvedValue({
      success: true,
      data: "User logged in",
    });

    render(<LoginForm />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.queryByText(/login failed/i)).not.toBeInTheDocument();
    });

    // Check if navigate was called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows an error message on failed login", async () => {
    userService.login.mockResolvedValue({
      success: false,
      error: "Invalid credentials",
    });

    render(<LoginForm />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Check for the error message, which is based on the setError call in your component.
    await waitFor(() => {
      expect(
        screen.getByText("Login failed. Please check your credentials."),
      ).toBeInTheDocument();
    });

    // Verify navigate was not called on failed login
    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
