// AuthContext.test.jsx
import { fireEvent, render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext'; 

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

  // Simulate login
  fireEvent.click(screen.getByText(/log in/i));
  expect(screen.getByText(/is logged in: Yes/i)).toBeInTheDocument();

  // Simulate logout
  fireEvent.click(screen.getByText(/log out/i));
  expect(screen.getByText(/is logged in: No/i)).toBeInTheDocument();
});
