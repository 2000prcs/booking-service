import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import Price from './Price.jsx';
import styles from '../styles.css';
import { Icon } from 'semantic-ui-react';


const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);
require('twix');
const axios = require('axios');

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: 0,
      adults: 1,
      children: 0,
      infants: 0,
      maximumGuests: 4,
      days: 0,
      startDate: null,
      endDate: null,
      focusedInput: null,
      booked: [],
      showMenu: false,
      showPrice: false,
      userInfo: {
        room_rate: 0,
        totalGuests: 1,
        totalDays: 0,
        totalPrice: 0,
      },
    };

    this.sendBookingRequest = this.sendBookingRequest.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }


  // Update user info every time user makes changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.endDate !== this.state.endDate) {
      this.getBookedDates();
      this.calculateTotalDays();
    }
    if (prevState.days !== this.state.days) {
      this.setUserInfo();
    }
  }

  // Set user info for passing it to Price component & sending it to the server
  setUserInfo() {
    this.setState({
      roomId: this.props.room.room_id,
      userInfo: {
        room_rate: this.props.room.room_rate,
        totalGuests: this.state.adults + this.state.children,
        totalDays: this.state.days,
        totalPrice: this.state.days * this.props.room.room_rate,
      },
    });
  }

  // Get all booked dates
  getBookedDates() {
    const date = moment.twix(this.state.startDate, this.state.endDate).iterate('days');
    const range = [];
    while (date.hasNext()) {
      range.push(date.next().toDate());
    }
    range.pop();
    this.setState({ booked: range });
  }

  calculateTotalDays() {
    const countDays = moment(this.state.startDate).twix(this.state.endDate).count('days') - 1;
    this.setState({ days: countDays });
  }

  // To block unavailable dates
  isDayBlocked(day) {
    const reserved = this.props.room.booked_dates;
    for (let i = 0; i < reserved.length; i++) {
      if (moment(reserved[i]).twix(day).isSame('day')) {
        return true;
      }
    }
    return false;
  }

  // Increment & decrement guest numbers
  incrementGuest(e, guestType) {
    if ((this.state.maximumGuests - (this.state.adults + this.state.children)) >= 1) {
      this.setState((prevState) => {
        return { [guestType]: prevState[guestType] + 1 };
      });
    }
    this.setState({ showPrice: true }, this.setUserInfo);
  }

  decrementGuest(e, guestType) {
    if (guestType === 'adults') {
      if (this.state[guestType] >= 2) {
        this.setState((prevState) => {
          return { [guestType]: prevState[guestType] - 1 };
        });
      }
    } else {
      if (this.state[guestType] >= 1) {
        this.setState((prevState) => {
          return { [guestType]: prevState[guestType] - 1 };
        });
      }
    }
    this.setState({ showPrice: true }, this.setUserInfo);
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
        alert('Congratulations! The room is reserved for you!');
      })
      .catch((error) => {
        console.error(error);
      });
  }


  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }


  render() {

    return (
      <div className={styles.component}>
        <div>
          <span>Dates</span>
        </div>
        <DateRangePicker
          startDate={this.state.startDate}
          startDateId="start_date_id"
          endDate={this.state.endDate}
          endDateId="end_date_id"
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          isDayBlocked={day => this.isDayBlocked(day)}
        />
        <div>
          <span>Guests</span>
        </div>
        <div>
          <div>
            <div className={styles.guestMenu} onClick={this.showMenu}>
              <span>{this.state.userInfo.totalGuests} {this.state.userInfo.totalGuests >= 2 ? 'guests' : 'guest'}</span>
              <i id={styles.arrow} className={this.state.showMenu ? 'fas fa-angle-up' : 'fas fa-angle-down'} />
            </div>

            {
              this.state.showMenu
                ? (
                  <div
                    className={styles.menu}
                    ref={(element) => {
                      this.dropdownMenu = element;
                    }}
                  >
                    <div className={styles.guestType}>
                      <span>Adults</span>
                      <Icon id="adult-plus" className={styles.icon} name="plus circle" onClick={e => this.incrementGuest(e, 'adults')} />
                      <span className={styles.guest}>{this.state.adults}</span>
                      <Icon id="adult-minus" className={styles.icon} name="minus circle" onClick={e => this.decrementGuest(e, 'adults')} />
                    </div>
                    <div className={styles.guestType}> 
                      <span>Children  (Ages 2 - 12)</span>
                      <Icon id="children-plus" className={styles.icon} name="plus circle" onClick={e => this.incrementGuest(e, 'children')} />
                      <span className={styles.guest}>{this.state.children}</span>
                      <Icon id="children-minus" className={styles.icon} name="minus circle" onClick={e => this.decrementGuest(e, 'children')} />
                    </div>
                    <div id="infant" className={styles.guestType}>
                      <span>Infants   (Under 2)</span>
                      <Icon id="infant-plus" className={styles.icon} name="plus circle" onClick={e => this.incrementGuest(e, 'infants')} />
                      <span className={styles.guest}>{this.state.infants}</span>
                      <Icon id="infant-minus" className={styles.icon} name="minus circle" onClick={e => this.decrementGuest(e, 'infants')} />
                    </div>
                    <div className={styles.guestCaption}>
                      <span >{this.state.maximumGuests} guests maximum. Infants don't count toward the number of guests.</span>
                    </div>
                  </div>
                )
                : (
                  null
                )
            }
          </div>

          {this.state.showPrice
            ? <Price room={this.props.room} option={this.state.userInfo} />
            : null}
          {/* {this.state.showMenu
            ? null : */}
          <button className={styles.button} onClick={this.sendBookingRequest}>Book</button>
        </div>
      </div>
    );
  }
}
