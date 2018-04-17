import React from 'react';
import ReactDOM from 'react-dom';
import Stars from './components/Stars.jsx';
import Form from './components/Form.jsx';
import Finding from './components/Finding.jsx';
import { Container } from 'semantic-ui-react';
import styles from './styles.css';


const axios = require('axios');


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      room: {
        room_id: 5,
        room_rate: '',
        room_name: '',
        world_name: '',
        host_name: '',
        booked_dates: [],
        guest_number: 0,
        review_count: 0,
        review_grade: 0,
      },
      rooms: [],
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

      <Container>
        <div className={styles.component}>
          <span>
            <span>${this.state.room.room_rate}</span>
            <span> per night</span>
          </span>
        </div>
        <div className={styles.component}>
          <Stars room={this.state.room} />
        </div >
        <Form room={this.state.room} />
        <div className={styles.component}>
          <Finding room={this.state.room} />
        </div>
      </Container>


    );
  }
}

ReactDOM.render(<App />, document.getElementById('booking'));
