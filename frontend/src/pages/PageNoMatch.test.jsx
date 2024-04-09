/*
Tests for PageNoMatch.jsx
Ensure basic elements are on page for now. Additionally checks to see if reroute is proper.
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '../contexts/AuthContext';
import PageNoMatch from './PageNoMatch';
import { useAuth } from '../contexts/AuthContext';

// Mock the useAuth hook
jest.mock('../contexts/AuthContext', () => ({
    useAuth: jest.fn(),
  }));

describe('404 Page', () => {
    beforeEach(() => {
        // Reset the mock before each test
        useAuth.mockReset();
    });

    const renderWithRouter = (ui, { route = '/test' } = {}) => { //use '/test' as route to test 404, since '/test' won't be a website path implemented.
        window.history.pushState({}, 'Test page', route);
        return render(ui, { wrapper: BrowserRouter });
      };
    
      it('should render the 404 page correctly', () => {
        // Mock the return value of useAuth if needed
        useAuth.mockReturnValue({
          user: {
            BusinessID: '123', 
          },
          isLoggedIn: true,
        });
    
        renderWithRouter(<PageNoMatch />);
        // Check for the page title
        expect(screen.getByRole('heading', { name: /that's a 404./i })).toBeInTheDocument();
        // Check for the "Add User +" button
        expect(screen.getByRole('link', { name: /back to safety. \+/i })).toBeInTheDocument();
      });
});

