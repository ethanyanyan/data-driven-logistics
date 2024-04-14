// UsersListPage.test.jsx

import React from 'react';
import { render, screen, waitFor, fireEvent, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import UsersListPage from './UsersListPage';
import { useAuth } from '../contexts/AuthContext';
import * as userService from '../services/userService';

jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../services/userService', () => ({
  fetchUsersByCompany: jest.fn(),
  deleteUser: jest.fn(),
}));

describe('UsersListPage', () => {
  beforeEach(() => {
    useAuth.mockReset();
    userService.fetchUsersByCompany.mockReset();
    userService.deleteUser.mockReset();
    jest.clearAllMocks();

    useAuth.mockReturnValue({
      user: { BusinessID: '123' },
      isLoggedIn: true,
    });
    userService.fetchUsersByCompany.mockResolvedValue([
      { UserID: '1', FirstName: 'John', LastName: 'Doe', RoleID: '2' },
      { UserID: '2', FirstName: 'Jane', LastName: 'Doe', RoleID: '3' }
    ]);
    userService.deleteUser.mockResolvedValue({ success: true });
    window.alert = jest.fn();
  });

  afterEach(() => {
    cleanup(); 
  });

  const renderWithRouter = (ui, { route = '/users' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  it('renders the users list page correctly', async () => {
    renderWithRouter(<UsersListPage />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /list of users/i })).toBeInTheDocument();
    });

    await screen.findByText('John');

    expect(await screen.findByRole('button', { name: /add user \+/i })).toBeInTheDocument();
  });

  it('deletes a user when the delete button is clicked and confirms the action', async () => {
    window.confirm = jest.fn(() => true);
    renderWithRouter(<UsersListPage />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /list of users/i })).toBeInTheDocument();
    });

    await screen.findByText('John');

    // Wait for the users to be loaded and displayed
    const deleteButtons = await screen.findAllByRole('button', { name: /delete/i });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    expect(userService.deleteUser).toHaveBeenCalledWith('1');
    expect(window.confirm).toHaveBeenCalled();
  });
});
