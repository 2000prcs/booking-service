import React from 'react';
import styles from '../styles.css';
import Calendar from './Calendar.jsx';
import Price from './Price.jsx';
import { Dropdown, Grid, Segment } from 'semantic-ui-react';

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
      num: 0,
      showMenu: false,
      total: {
        totalGuests: 0,
        totalPrice: 0,
        totalDays: 7,
      },
    };

    this.showMenu = this.showMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({
      showMenu: true,
    });
  }


  handleChange(event, val) {
    console.log('event:', event, 'value:', val.value);
    this.setState({ num: val.value });
  }

  render() {
    const { num } = this.state;

    return (
      <div className={styles.component}>
        <div>
          <Calendar />
        </div>
        <div>
          <span>Guests</span>
        </div>
        <div>
          <Dropdown
            onChange={(event, value) => this.handleChange(event, value)}
            options={options}
            placeholder="Select Guest Number"
            selection
            // value={num}
          />
          <Price room={this.props.room} option={this.state.total} />
          <button className={styles.button}>Book</button>
        </div>
      </div>
    );
  }
}
