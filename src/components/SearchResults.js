import React from 'react';
import styles from './SearchResults.module.css';
import Track from './Track';


function SeachResults(props) {
    const results = props.results;
    return (<>

        <div className={styles.searchResults}>
            <h2>Results</h2>
            {
                results.map((result) => (
                    <Track key={result.id} track={result} />
                ))

            }

        </div>
    </>)
}


export default SeachResults;
