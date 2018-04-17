import React from 'react';
import styles from '../styles.css';

const Finding = ({room}) => (

  <div>
    <div>
      <span>This is a rare find.</span>
    </div>
    <div>
      <span>{room.host_name}'s place is usually booked. </span>
      <i className="fas fa-gem" />
    </div>
  </div>

);


export default Finding;