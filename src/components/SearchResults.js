import React, { useState } from 'react';
import styles from './SearchResults.module.css';
import Track from './Track';


function SeachResults(props) {
    const results = props.results;
    const addRemoveTrack = true;
    const addPlaylist = props.addPlaylist;
    return (<>

        <div className={styles.searchResults}>
            <h2>Results</h2>
            {
                results.map((result) => (
                    <Track key={result.id} track={result} addRemoveTrack={addRemoveTrack} addPlaylist={addPlaylist} />
                ))

            }

        </div>
    </>)
}


export default SeachResults;
