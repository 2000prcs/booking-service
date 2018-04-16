import React from 'react';
import styles from '../styles.css';
import Calendar from './Calendar.jsx';
import Price from './Price.jsx';
import { Dropdown, Grid, Segment } from 'semantic-ui-react';

const Moment = require('moment');
const MomentRange = require('moment-range');
require('twix');
const axios = require('axios');

const moment = MomentRange.extendMoment(Moment);

const options = [
  { key: 1, text: 'One Guest', value: 1 },
  { key: 2, text: 'Two Guests', value: 2 },
  { key: 3, text: 'Three Guests', value: 3 },
  { key: 4, text: 'Four Guests', value: 4 },
];

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: 0,
      guestNumber: 0,
      checkin: '',
      checkout: '',
      days: '',
      booked: [],
      showMenu: false,
      userInfo: {
        totalGuests: 0,
        totalDays: 0,
        totalPrice: 0,
      },
    };

    this.showMenu = this.showMenu.bind(this);
    this.sendBookingRequest = this.sendBookingRequest.bind(this);
  }

  // Set user info for passing it to Price component & sending it to the server
  setUserInfo() {
    this.setState({
      roomId: this.props.room.room_id,
      userInfo: {
        totalGuests: this.state.guestNumber,
        totalDays: this.state.days,
        totalPrice: this.state.days * this.props.room.room_rate,
      },
    });
  }

  // Get check-in and check-out dates from the user
  // To do: user shouldn't pick startdate after enddate
  // to do: if user selects different date, it should update the info
  handleDates(event, type) {
    event.preventDefault();
    if (type === 'checkin') {
      this.setState({ checkin: event.target.value }, this.calculateTotalDays);
    } else {
      this.setState({ checkout: event.target.value }, this.calculateTotalDays);
    }
  }

  // Calculate days between check-in and check-out
  parseDate(date) {
    const mdy = date.split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
  }

  calculateTotalDays() {
    const startDate = this.parseDate(this.state.checkin);
    const endDate = this.parseDate(this.state.checkout);
    if (!!startDate && !!endDate) {
      const dateDiff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
      this.setState({ days: dateDiff });
      this.getBookedDates();
    }
    return false;
  }

  // Get all booked dates
  getBookedDates() {
    // const dates = [moment(this.state.checkin, 'YYYY-MM-DD'), moment(this.state.checkout, 'YYYY-MM-DD')];
    // const range = moment.range(dates);

    const date = moment.twix(new Date(this.state.checkin), new Date(this.state.checkout)).iterate('days');
    const range = [];
    while (date.hasNext()) {
      range.push(date.next().toDate());
    }
    range.shift();
    this.setState({ booked: range });
  }

  // For dropdown menu
  showMenu(event) {
    event.preventDefault();
    this.setState({
      showMenu: true,
    });
  }


  // Get guest numbers from the user
  handleGuests(event, val) {
    this.setState({ guestNumber: val.value }, this.setUserInfo);
  }


  // Send booking request to the server
  sendBookingRequest() {
    const data = {
      id: this.state.roomId,
      booked: this.state.booked,
      guest_name: 'Mo',
    };

    axios.post('/booking', data)
      .then((response) => {
        console.log('POST request success: ', response);
      })
      .catch((error) => {
        console.log('POST request failed: ', error);
      });
  }

  render() {
    const { guestNumber } = this.state;

    return (
      <div className={styles.component}>
        {/* <Calendar /> */}
        <div>
          <div>
            <span>Check-In</span>
            <input onChange={(event, type) => this.handleDates(event, 'checkin')} type="date" className={styles.dates} />
          </div>
          <div>
            <span>Check-Out</span>
            <input onChange={(event, type) => this.handleDates(event, 'checkout')} type="date" className={styles.dates} />
          </div>
        </div>
        <div>
          <span>Guests</span>
        </div>
        <div>
          <Dropdown
            onChange={(event, value) => this.handleGuests(event, value)}
            options={options}
            placeholder="Select Guest Number"
            selection
          // value={num}
          />
          <Price room={this.props.room} option={this.state.userInfo} />
          <button className={styles.button} onClick={this.sendBookingRequest}>Book</button>
        </div>
      </div>
    );
  }
}
