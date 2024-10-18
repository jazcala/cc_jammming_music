import React from 'react';
import Track from './Track';
import styles from './Tracklist.module.css';

function Tracklist (props) {
    const results = props.songs
    return(
        <div className={styles.tracklist}>
        <h2>Tracklist</h2>
        <input type="text" placeholder="Add a playlist title"/>
{
        results.map((result) => (
                    <Track  key={result.id} toggle={false} track={result} />
                ))}
        <button className={styles.Button}>Save to Spotify</button>
        </div>

    )
};

export default Tracklist;
