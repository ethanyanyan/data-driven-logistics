/*
Tests for Dashboard.jsx
Ensure basic elements are on page for now
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

// Mock the DataDrivenLogisticsNavbar to simplify the test
jest.mock("../components/navigation/DataDrivenLogisticsNavbar", () => () => (<div>Navbar Mock</div>));

describe('Dashboard Page', () => {
  // Render the Dashboard within a Router because it contains Link components
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  it('should render the dashboard page correctly', () => {
    renderWithRouter(<Dashboard />);

    // Check for the Navbar
    expect(screen.getByText('Navbar Mock')).toBeInTheDocument();

    // Check for the Dashboard heading
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();

    // Check for the Quick Links section
    expect(screen.getByRole('heading', { name: /quick links/i })).toBeInTheDocument();

    // Check for specific links and buttons
    expect(screen.getByRole('link', { name: /shipment tracking/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filter data/i })).toBeInTheDocument();
  });
});
