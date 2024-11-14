import React from 'react';
import './Track.module.css';
import styles from './Track.module.css';


function Track(props) {
    const track = props.track;
    const addRemoveTrack = props.addRemoveTrack;

    const handleClick = (e) => {
        e.preventDefault();
        if (addRemoveTrack) {
            props.addPlaylist(track);
        } else {
            props.removeFromPlaylist(track)
        }
    }

    return (<div className={styles.Track}>
        <div >
            <h3>{track.name}</h3>
            <p>{track.artist}</p>
        </div>
        <button onClick={handleClick}>{addRemoveTrack ? '+' : '-'}</button>
    </div>)
}

export default Track;
