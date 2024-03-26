import React from "react"
import { render, screen } from "@testing-library/react"
import Signup from "."

test("signup screen displays text", () => {
    render(<Signup />)
    expect(screen.getByText("Create New Account")).toBeInTheDocument()
})

test("signup screen has submit button", () => {
    render(<Signup />)
    expect(screen.getByText("SUBMIT")).toBeInTheDocument()
})