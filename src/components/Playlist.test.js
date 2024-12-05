import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Playlist from './Playlist';

it("input to add tittle with placeholder", () => {
  render(<Playlist />);
  const input = screen.getByRole('textbox');
  expect(input.getAttribute('placeholder')).toBe('Add a playlist title');
})



it('save to playlist button is displayed', () => {
  render(<Playlist />);
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('Save to Spotify');
})


// TODO add test with mock data
