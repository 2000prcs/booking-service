import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import Calendar from './Calendar.jsx';
import Price from './Price.jsx';
// import { Dropdown, Icon } from 'semantic-ui-react';
import styles from '../styles.css';
import { Icon } from 'semantic-ui-react';


const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
require('twix');
const axios = require('axios');
// import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';


// const options = [
//   { key: 1, text: 'Adults', value: 1, icon: 'plus' },
//   { key: 2, text: 'Children', value: 2 },
//   { key: 3, text: 'Infant', value: 3 },
// ];

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: 0,
      guestNumber: 0,
      days: 0,
      startDate: null,
      endDate: null,
      focusedInput: null,
      booked: [],
      showMenu: false,
      showPrice: false,
      userInfo: {
        totalGuests: 0,
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
        totalGuests: this.state.guestNumber,
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
    let reserved = this.props.room.booked_dates;
    for (let i = 0; i < reserved.length; i++) {
      if (moment(reserved[i]).twix(day).isSame('day')) {
        return true;
      }
    }
    return false;
  }

  // Get guest numbers from the user
  handleGuests(event, val) {
    this.setState({ guestNumber: val.value }, this.setUserInfo);
    this.setState({ showPrice: true });
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
    const { guestNumber } = this.state;

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
          isDayBlocked={(day) => this.isDayBlocked(day)}
        />
        <div>
          <span>Guests</span>
        </div>
        <div>
          {/* <Dropdown
            onChange={(event, value) => this.handleGuests(event, value)}
            options={options}
            placeholder="Select Guest Number"
            selection
            defaultValue={1}
          // value={num}
          /> */}

          <div>
            <button className={styles.menu} onClick={this.showMenu}>
              1 guest
            </button>

            {
              this.state.showMenu
                ? (
                  <div
                    className="menu"
                    ref={(element) => {
                      this.dropdownMenu = element;
                    }}
                  >
                    <div>
                      <span>Adults</span><Icon name='minus' /> 1 <Icon name='plus' /> 
                    </div>
                    <div>
                      <span>Children</span><Icon name='minus' /> 0 <Icon name='plus' /> 
                    </div>
                    <div>
                      <span>Infants</span><Icon name='minus' /> 0 <Icon name='plus' />
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
          <button className={styles.button} onClick={this.sendBookingRequest}>Book</button>
        </div>
      </div>
    );
  }
}
