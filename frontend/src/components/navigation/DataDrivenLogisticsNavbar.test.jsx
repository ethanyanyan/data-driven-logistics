/*
Tests for DataDrivenLogisticsNavbar.jsx
Ensure basic elements are on page for now
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import DataDrivenLogisticsNavbar from './DataDrivenLogisticsNavbar';
import { AuthContext } from '../../contexts/AuthContext';

// Define a mock context provider inside your test file
const MockAuthProvider = ({ children }) => {
  const mockUseAuth = () => ({
    logout: jest.fn(),
  });

  // Replace your context's value with the mock implementation
  return (
    <AuthContext.Provider value={mockUseAuth()}>
      {children}
    </AuthContext.Provider>
  );
};


describe('DataDrivenLogisticsNavbar', () => {
  // Renders the Navbar within the Router because it contains Link components
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
  
    return render(
      <BrowserRouter>
        <MockAuthProvider>
          {ui}
        </MockAuthProvider>
      </BrowserRouter>
    );
  };

  it('renders the navbar with the logo and company name', () => {
    renderWithRouter(<DataDrivenLogisticsNavbar />);
    
    // Check for the logo image
    const logoImage = screen.getByRole('img', { name: /data driven logistics logo/i });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', expect.stringContaining('logo.png'));
    
    // Check for the company name link
    const companyNameLink = screen.getByRole('link', { name: /data driven logistics/i });
    expect(companyNameLink).toBeInTheDocument();
    expect(companyNameLink).toHaveAttribute('href', '/dashboard');
  });
});
