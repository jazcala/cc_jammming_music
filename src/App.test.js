import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jamming Title', () => {
  render(<App />);
  const headerText = screen.getByText(/Jamming/i);
  expect(headerText).toBeInTheDocument();
});
