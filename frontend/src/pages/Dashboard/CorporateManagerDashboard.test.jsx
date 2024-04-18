import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CorporateManagerDashboard from './CorporateManagerDashboard';

// Helper function to render the component within a router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(<Router>{ui}</Router>);
};

describe('CorporateManagerDashboard', () => {
  it('renders without crashing and contains the correct static texts', () => {
    renderWithRouter(<CorporateManagerDashboard />);
    expect(screen.getByText('Corporate Manager Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Create New Location')).toBeInTheDocument(); 
  });

  it('has a button that can be clicked', () => {
    renderWithRouter(<CorporateManagerDashboard />);
    const button = screen.getByText('Create New Location');
    fireEvent.click(button); // Simulate a user click
  });

  it('shows the table headers correctly', () => {
    renderWithRouter(<CorporateManagerDashboard />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Business ID')).toBeInTheDocument();
    expect(screen.getByText('Latitude')).toBeInTheDocument();
    expect(screen.getByText('Longitude')).toBeInTheDocument();
  });
});

