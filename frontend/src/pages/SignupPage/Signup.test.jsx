import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; 
import Signup from ".";

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(<Router>{ui}</Router>);
};

test("signup screen displays text", () => {
    renderWithRouter(<Signup />);
    expect(screen.getByText("Create New Account")).toBeInTheDocument();
});

test("signup screen has submit button", () => {
    renderWithRouter(<Signup />);
    expect(screen.getByText("SUBMIT")).toBeInTheDocument();
});
