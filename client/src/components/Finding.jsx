import React from 'react';
import styles from '../styles.css';

const Finding = ({room}) => (

  <div>
    <div>
      <span className={styles.find}>This is a rare find.</span>
    </div>
    <div>
      <span className={styles.finding}>{room.host_name}'s place is usually booked. </span>
      <span className={styles.icon}><i className="fas fa-gem" /></span>
    </div>
  </div>

);


export default Finding;