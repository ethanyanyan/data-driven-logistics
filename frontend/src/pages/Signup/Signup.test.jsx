import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import Signup from ".";

// Helper function to render the component within a router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: MemoryRouter });
};

test("signup screen displays text", () => {
    renderWithRouter(<Signup />);
    expect(screen.getByText("Create New Account")).toBeInTheDocument();
});

test("signup screen has submit button", () => {
    renderWithRouter(<Signup />);
    expect(screen.getByText("SUBMIT")).toBeInTheDocument(); 
});
