import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';


it('renders Jamming Title', () => {
  render(<App />);
  const headerText = screen.getByText(/Jamming/i);
  expect(headerText).toBeInTheDocument();
});


it('user is allow to add title', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByRole('textbox', { name: 'playlist-title' })
  const title = "Playlist Title";
  await user.type(input, title);
  expect(input).toHaveValue(title);

})
