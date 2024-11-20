import React from 'react';
import Track from './Track';

function Tracklist({ tracks, removeFromPlaylist, addRemoveTrack, addToPlaylist }) {

  return (
    <>
      {
        tracks ?
          tracks.map((song) => (
            <Track key={song.id}
              addRemoveTrack={addRemoveTrack}
              track={song}
              removeFromPlaylist={removeFromPlaylist}
              addToPlaylist={addToPlaylist}
            />
          )) : console.log('no tracks')
      }
    </>
  )
}

export default Tracklist;
