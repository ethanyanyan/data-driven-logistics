// ProtectedRoute.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'; // Adjust the import path as necessary
import { AuthContext } from './../contexts/AuthContext'; // Adjust the import path as necessary

// Mock component that will try to access a protected route
const ProtectedComponent = () => <div>Protected content</div>;

const TestRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={children} />
    </Routes>
  </BrowserRouter>
);

// Mock AuthProvider with controlled state
const MockAuthProvider = ({ children, isAuthenticated }) => {
  const authValue = {
    isLoggedIn: isAuthenticated,
    login: () => {},
    logout: () => {},
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

test('ProtectedRoute redirects unauthenticated users', () => {
  render(
    <MockAuthProvider isAuthenticated={false}>
      <TestRouter>
        <ProtectedRoute>
          <ProtectedComponent />
        </ProtectedRoute>
      </TestRouter>
    </MockAuthProvider>
  );

  // The protected content should not be rendered
  expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
});

test('ProtectedRoute allows authenticated users', () => {
  render(
    <MockAuthProvider isAuthenticated={true}>
      <TestRouter>
        <ProtectedRoute>
          <ProtectedComponent />
        </ProtectedRoute>
      </TestRouter>
    </MockAuthProvider>
  );

  // The protected content should be rendered
  expect(screen.getByText('Protected content')).toBeInTheDocument();
});
