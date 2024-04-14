// AuthContext.test.jsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext'; 
import { loginAPI } from '../services/userService';

jest.mock("./../services/userService", () => ({
    loginAPI: jest.fn(),
  }));

// Mock component to use AuthContext
const MockComponent = () => {
  const { isLoggedIn, login, logout } = useAuth();
  return (
    <div>
      Is logged in: {isLoggedIn ? 'Yes' : 'No'}
      <button onClick={login}>Log in</button>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

test('AuthContext provides authentication state and functions', async () => {
  render(
    <AuthProvider>
      <MockComponent />
    </AuthProvider>
  );

  loginAPI.mockResolvedValue({data:{ success: true }});

  // Simulate login
  fireEvent.click(screen.getByText(/log in/i));
  await waitFor(() => {
    expect(screen.getByText(/is logged in: Yes/i)).toBeInTheDocument();
  });

  // Simulate logout
  fireEvent.click(screen.getByText(/log out/i));
  await waitFor(() => {
    expect(screen.getByText(/is logged in: No/i)).toBeInTheDocument();
  });
});
