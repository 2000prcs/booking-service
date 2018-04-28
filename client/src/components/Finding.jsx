import React from 'react';
import styles from '../styles.css';

const Finding = ({room}) => (

  <div>
    <div>
      <span className={styles.find}>This is a rare find.</span>
    </div>
    <div>
      <div className={styles.finding}>{room.host_name}'s place is usually booked.
        <img className={styles.findingIcon} src="http://localhost:7777/diamond.svg" />
      </div>
    </div>
  </div>

);


export default Finding;