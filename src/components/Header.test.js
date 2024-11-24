import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders Jamming Title', () => {
  render(<Header />);
  const headerText = screen.getByText(/Jamming/i);
  expect(headerText).toBeInTheDocument();
});
