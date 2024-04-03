/*
Tests for People.jsx
Ensure basic elements are on page for now
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import People from './People';

// Mock the DataDrivenLogisticsNavbar to focus on testing People functionality
jest.mock("../components/navigation/DataDrivenLogisticsNavbar", () => {
  return function DummyNavbar() {
    return <div data-testid="navbar">Navbar Mock</div>;
  };
});

describe('People Page', () => {
  it('renders the People page with navbar and heading', () => {
    render(<People />);

    // Check for the mocked Navbar presence
    const navbarElement = screen.getByTestId('navbar');
    expect(navbarElement).toBeInTheDocument();
    expect(navbarElement.textContent).toBe('Navbar Mock');

    // Check for the Shipment Tracking heading
    const headingElement = screen.getByRole('heading', { name: /people/i });
    expect(headingElement).toBeInTheDocument();
  });
});

