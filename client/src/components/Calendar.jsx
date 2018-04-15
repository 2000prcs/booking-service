import React from 'react';
import styles from '../styles.css';

const moment = require('moment');

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkin: '',
      checkout: '',
    };
  }

  handleChange(event, type) {
    event.preventDefault();
    if (type === 'checkin') {
      this.setState({ checkin: event.target.value });
    } else {
      this.setState({ checkout: event.target.value });
    }
  }


  render() {
    return (

      <div>
        <div>
          <span>Check-In</span>
          <input onChange={(event, type) => this.handleChange(event, 'checkin')} type="date" />
        </div>
        <div>
          <span>Check-Out</span>
          <input onChange={(event, type) => this.handleChange(event, 'checkout')} type="date" />
        </div>
      </div>

    );
  }
}


export default Calendar;
