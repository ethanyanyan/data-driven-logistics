// Dashboard.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useAuth } from '../contexts/AuthContext';

// Mock the DataDrivenLogisticsNavbar to include the logout button
jest.mock("../components/navigation/DataDrivenLogisticsNavbar", () => ({ handleLogout }) => (
  <div>
    Navbar Mock
    <button onClick={handleLogout}>Logout</button>
  </div>
));

// Mock the useAuth hook
jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Dashboard Page', () => {
  beforeEach(() => {
    // Reset the mock before each test
    useAuth.mockReset();
  });

  // Render the Dashboard within a Router because it contains Link components
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  it('should render the dashboard page correctly', () => {
    // Mock the return value of useAuth
    useAuth.mockReturnValue({
      logout: jest.fn(),
    });

    renderWithRouter(<Dashboard />);
    // Check for the Navbar
    expect(screen.getByText('Navbar Mock')).toBeInTheDocument();
    // Check for the Dashboard heading
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
    // Check for the Quick Links section
    expect(screen.getByRole('heading', { name: /quick links/i })).toBeInTheDocument();
    // Check for specific links and buttons
    expect(screen.getByRole('link', { name: /shipment tracking/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filter data/i })).toBeInTheDocument();
  });

  it('should call the logout function when the logout button is clicked', () => {
    // Create a mock logout function
    const logoutMock = jest.fn();

    // Mock the return value of useAuth with the mock logout function
    useAuth.mockReturnValue({
      logout: logoutMock,
    });

    renderWithRouter(<Dashboard />);

    // Find the logout button and click it
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    // Assert that the logout function was called
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
