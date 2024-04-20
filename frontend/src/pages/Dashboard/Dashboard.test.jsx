import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import Dashboard from "./Dashboard";

// Mock the CorporateManagerDashboard and InventoryManagerDashboard components
jest.mock("./CorporateManagerDashboard", () => () => (
  <div>Corporate Manager Dashboard</div>
));
jest.mock("./InventoryManagerDashboard", () => () => (
  <div>Inventory Manager Dashboard</div>
));

describe("Dashboard", () => {
  it("renders Corporate Manager Dashboard for roles 1, 2, 4", () => {
    const user = { RoleID: 1 };
    render(
      <AuthContext.Provider value={{ user }}>
        <Dashboard />
      </AuthContext.Provider>,
    );
    expect(screen.getByText("Corporate Manager Dashboard")).toBeInTheDocument();
  });

  it("renders Inventory Manager Dashboard for other roles", () => {
    const user = { RoleID: 3 };
    render(
      <AuthContext.Provider value={{ user }}>
        <Dashboard />
      </AuthContext.Provider>,
    );
    expect(screen.getByText("Inventory Manager Dashboard")).toBeInTheDocument();
  });

  it("renders Inventory Manager Dashboard when user is not defined", () => {
    render(
      <AuthContext.Provider value={{}}>
        <Dashboard />
      </AuthContext.Provider>,
    );
    expect(screen.getByText("Inventory Manager Dashboard")).toBeInTheDocument();
  });
});
