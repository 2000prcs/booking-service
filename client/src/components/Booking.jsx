import React from 'react';
import ReactDOM from 'react-dom';
import Stars from './Stars.jsx';
import Form from './Form.jsx';
import Finding from './Finding.jsx';
import { Container } from 'semantic-ui-react';
import styles from '../styles.css';


const axios = require('axios');


class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {
        room_id: this.props.room,
        room_rate: '',
        room_name: '',
        host_name: '',
        booked_dates: [],
        guest_number: 0,
        review_count: 0,
        review_grade: 0,
      },
    };
  }

  componentDidMount() {
    this.getRoomData();
  }

  // fetch new room id from the server
  componentDidUpdate() {

  }

  // Fetch this page's room data
  getRoomData() {
    axios.get(`/booking/${this.state.room.room_id}`)
      .then((items) => {
        console.log('Data receiced', items.data);
        this.setState({ room: items.data });
      })
      .catch(err => console.log('Fetching error', err));
  }


  render() {
    return (

      <div className={styles.container}>
        <div className={styles.component}>
          <span>
            <span className={styles.font}>${this.state.room.room_rate}</span>
            <span> per night</span>
          </span>
        </div>
        <div className={styles.component}>
          <Stars room={this.state.room} />
        </div >
        <div className={styles.border} />
        <Form room={this.state.room} />
        <div className={styles.component}>
          <span className={styles.info}>You won't be charged yet</span>
          <div className={styles.border} />
          <Finding room={this.state.room} />
        </div>
      </div>


    );
  }
}

export default Booking;
