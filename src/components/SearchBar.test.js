import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import App from '../App';

it('renders search section', () => {
  render(<SearchBar
    search={() => { }}
    searchBy={'Song'}
    setSearchBy={() => { }} />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('Song');

});

it('set value renders empty', () => {
  render(<App />);
  const input = screen.getByTestId('search-by-input');
  expect(input).toHaveValue('');
});

it('have search button enable', () => {
  render(<SearchBar
    search={() => { }}
    searchBy={'Song'}
    setSearchBy={() => { }} />);
  const button = screen.getByTestId('search-button');
  expect(button).toBeEnabled();
});

it('should display search results', () => {
  // TODO with mock data
});
