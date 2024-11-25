import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Track from './Track';

const testingTrack = { name: 'Flowers', artist: 'Miley Cyrus' };

it('Track is displayed with add button', () => {
  render(<Track
    track={testingTrack}
    addRemoveTrack={true}
    addToPlaylist={() => { }}
    removeFromPlaylist={() => { }}
  />);
  let button = screen.getByRole('button');
  expect(button).toHaveTextContent('+');
})

it('Track is displayed with remove button', () => {
  render(<Track
    track={testingTrack}
    addRemoveTrack={false}
    addToPlaylist={() => { }}
    removeFromPlaylist={() => { }}
  />);
  let button = screen.getByRole('button');
  expect(button).toHaveTextContent('-');
})

it('should displayed track name', () => {
  render(<Track track={testingTrack}
    addRemoveTrack={false}
    addToPlaylist={() => { }}
    removeFromPlaylist={() => { }}
  />);
  let heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent(testingTrack.name)
})

it('should displayed track name', () => {
  render(<Track track={testingTrack}
    addRemoveTrack={false}
    addToPlaylist={() => { }}
    removeFromPlaylist={() => { }}
  />);
  let textArtist = screen.getByRole('paragraph');
  expect(textArtist).toHaveTextContent(testingTrack.artist)
})
