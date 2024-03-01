/*
Tests for ShipmentTracking.jsx
Ensure basic elements are on page for now
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShipmentTracking from './ShipmentTracking';

// Mock the DataDrivenLogisticsNavbar to focus on testing ShipmentTracking functionality
jest.mock("../components/navigation/DataDrivenLogisticsNavbar", () => {
  return function DummyNavbar() {
    return <div data-testid="navbar">Navbar Mock</div>;
  };
});

describe('ShipmentTracking Page', () => {
  it('renders the ShipmentTracking page with navbar and heading', () => {
    render(<ShipmentTracking />);

    // Check for the mocked Navbar presence
    const navbarElement = screen.getByTestId('navbar');
    expect(navbarElement).toBeInTheDocument();
    expect(navbarElement.textContent).toBe('Navbar Mock');

    // Check for the Shipment Tracking heading
    const headingElement = screen.getByRole('heading', { name: /shipment tracking/i });
    expect(headingElement).toBeInTheDocument();
  });
});

