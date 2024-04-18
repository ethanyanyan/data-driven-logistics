import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FacilityManagerDashboard from './InventoryManagerDashboard';

// Helper function to render the component within a router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(<Router>{ui}</Router>);
};

describe('FacilityManagerDashboard', () => {
  it('renders without crashing and shows dashboard title', () => {
    renderWithRouter(<FacilityManagerDashboard />);
    expect(screen.getByText('Facility Manager Dashboard')).toBeInTheDocument();
  });

  it('has a button to create new item', () => {
    renderWithRouter(<FacilityManagerDashboard />);
    const createButton = screen.getByText('Create New Item');
    expect(createButton).toBeInTheDocument();
    fireEvent.click(createButton); // To check if button is clickable
  });

  it('shows table with headers', () => {
    renderWithRouter(<FacilityManagerDashboard />);
    expect(screen.getByText('Inventory Level ID')).toBeInTheDocument();
    expect(screen.getByText('Location ID')).toBeInTheDocument();
    expect(screen.getByText('Product ID')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('displays total items correctly', () => {
    renderWithRouter(<FacilityManagerDashboard />);
    expect(screen.getByText(/Total Items: \d+/)).toBeInTheDocument();
  });
});

