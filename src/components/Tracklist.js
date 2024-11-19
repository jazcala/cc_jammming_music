import React from 'react';
import Track from './Track';

function Tracklist({ playlistTracks, removeFromPlaylist, addRemoveTrack }) {

  return (
    <>
      {
        playlistTracks.map((song) => (
          <Track key={song.id} addRemoveTrack={addRemoveTrack} track={song} removeFromPlaylist={removeFromPlaylist} />
        ))
      }
    </>
  )
}

export default Tracklist;
