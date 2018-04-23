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
      // room: {
      //   room_id: this.props.room,
      // },
      room: {
        room_id: 5,
        booked_dates: [],
        guest_number: 186,
        host_name: 'Rebecca',
        review_count: 93,
        review_grade: 5,
        room_name: '944 Market St.',
        room_rate: 93,
        world_name: 'Hack Reactor',
      },
    };
  }

  componentDidMount() {
    this.getRoomData();
  }

  // fetch new room id from the server
  componentDidUpdate(prevProps) {
    if (prevProps.room !== this.props.room) {
      this.getRoomData();
    }
  }

  // Fetch this page's room data
  getRoomData() {
    axios.get(`http://localhost:7777/booking/${this.state.room.room_id}`)
      .then((items) => {
        this.setState({ room: items.data });
      })
      .catch(err => console.error(err));
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

