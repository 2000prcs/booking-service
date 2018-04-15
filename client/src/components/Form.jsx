import React from 'react';
import styles from '../styles.css';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Calendar from './Calendar.jsx'
import Price from './Price.jsx';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {
        guestNumber: 0,
        totalGuests: 0,
        totalPrice: 0,
        totalDays: 7,
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ option: { guestNumber: value} });
  }

  render() {
    return (
      <div className={styles.component}>
        <div>
          <Calendar />
        </div>
        <div>
          <span>Guests</span>
        </div>
        <div>
          <DropDownMenu value={this.state.guestNumber} onChange={this.handleChange}>
            <MenuItem value={0} label={this.state.totalGuest} primaryText="Adults" />
            <MenuItem value={1} label={this.state.totalGuest} primaryText="Children" />
            <MenuItem value={2} label={this.state.totalGuest} primaryText="Infants" />
          </DropDownMenu>
          <Price room={this.props.room} option={this.state.option} />
          <button className={styles.button}>Book</button>
        </div>
      </div>
    );
  }
}
