/*
A super simple example of a test 
using a mock for 
a component that makes a fetch request.
*/

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

// Mock the global fetch function
global.fetch = jest.fn();

// Mocking the response data
const mockedData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

test('mocking example: renders user list', async () => {
  // Set up the mock for fetch
  fetch.mockResolvedValueOnce({
    json: async () => mockedData,
  });

  // Render the component
  render(<UserList />);

  // Wait for the data to be loaded and check that the user names are rendered
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
});
