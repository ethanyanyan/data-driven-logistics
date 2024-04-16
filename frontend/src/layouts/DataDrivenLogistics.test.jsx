/*
Tests for DataDrivenLogistics.jsx
Ensure basic elements are on page for now
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DataDrivenLogistics from './DataDrivenLogistics';

// Mock component to display as a child of DataDrivenLogistics
const MockChildComponent = () => <div>Mock Child Component</div>;
jest.mock('./../contexts/AuthContext', () => ({
  useAuth: () => ({
    logout: jest.fn(), // Mock logout function
    user: { RoleID: 1 } // Mock user object
  })
}));

describe('DataDrivenLogistics', () => {
  it('renders the component with an Outlet that can display nested routes', () => {
    // Render the DataDrivenLogistics within a MemoryRouter to simulate routing
    render(
      <MemoryRouter initialEntries={['/mock-path']}>
        <Routes>
          <Route path="/mock-path" element={<DataDrivenLogistics />}>
            <Route index element={<MockChildComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Check if the DataDrivenLogistics component renders correctly
    expect(screen.getByText('Mock Child Component')).toBeInTheDocument();
  });
});
