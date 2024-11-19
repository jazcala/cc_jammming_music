import React from 'react';
import Track from './Track';

function Tracklist({ songsPlaylist, removeFromPlaylist, addRemoveTrack }) {

  return (
    <>
      {
        songsPlaylist.map((song) => (
          <Track key={song.id} addRemoveTrack={addRemoveTrack} track={song} removeFromPlaylist={removeFromPlaylist} />
        ))
      }
    </>
  )
}

export default Tracklist;
