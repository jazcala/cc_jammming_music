import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeachResults from './SearchResults';




it('search Results section has results as heading', () => {
  render(<SeachResults />);
  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent('Results');

})


// TODO mock search results for test
