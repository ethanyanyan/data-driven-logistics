// UsersListPage.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import UsersListPage from './UsersListPage';
import { useAuth } from '../../contexts/AuthContext';

// Mock the useAuth hook
jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('UsersListPage', () => {
  beforeEach(() => {
    // Reset the mock before each test
    useAuth.mockReset();
  });

  // Helper function to render UsersListPage with router context because it might use <Link> or <Navigate>
  const renderWithRouter = (ui, { route = '/users' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  it('should render the users list page correctly', () => {
    // Mock the return value of useAuth if needed
    useAuth.mockReturnValue({
      user: {
        BusinessID: '123', 
      },
      isLoggedIn: true,
    });

    renderWithRouter(<UsersListPage />);

    // Check for the page title
    expect(screen.getByRole('heading', { name: /list of users/i })).toBeInTheDocument();
    // Check for the "Add User +" button
    expect(screen.getByRole('button', { name: /add user \+/i })).toBeInTheDocument();
  });

  // Add more tests as needed to cover other aspects of the UsersListPage behavior
});
