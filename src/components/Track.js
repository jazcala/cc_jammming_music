import React from 'react';
import './Track.module.css';
import styles from './Track.module.css';


function Track ({toggle = true, track={}}) {

    return (<div className={styles.Track}>
    <div >
    <h3>{track.name}</h3>
        <p>{track.artist}</p>
    </div>
    <button>{toggle? '+' : '-' }</button>
    </div>)
}
export default Track;
