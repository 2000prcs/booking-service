import React from 'react';
import $ from 'jquery';
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
    // webpack -p => 'production' & webpack -d => 'development' env swtich
    const url = (process.env.NODE_ENV === 'production') ? 'http://ec2-54-172-248-16.compute-1.amazonaws.com' : 'http://localhost:7777'; 
  
    if (process.env.NODE_ENV !== 'production') {
       console.log('Looks like we are in development mode!');
    }

    axios.get(`${url}/booking/${this.state.room.room_id}`)
      .then((items) => {
        this.setState({ room: items.data });
      })
      .catch(err => console.error(err));
  }


  render() {

    $(document).ready(function() {
      let height = $(document).height();
      let images = $('#images').height();
      let listings = $('#listings').height();
      let reviews = $('#reviews').height();
      let booking = $('#container').height();
      // console.log('height', height);
      // console.log('images', images);
      // console.log('booking', booking);
      // console.log('reviews', reviews);
      // console.log('listings', listings);
      window.onscroll = () => {
        // console.log('scrolling', window.scrollY);
        
        // Stops booking module before the listings module at the bottom
        if ($(window).scrollTop() >= (height - images - booking)) {
          document.getElementById('container').style.position = 'absolute';
          document.getElementById('container').style.top = `${height -  listings - booking - 30}px`;
        // fix module's position to scroll bar while scrolling
        } else if ($(window).scrollTop() >= 440) {
          document.getElementById('container').style.position = 'fixed';
          document.getElementById('container').style.top = '75px';
          // Stops booking module before the image module at the top 
        } else if ($(window).scrollTop() < 440) {
          document.getElementById('container').style.position = 'absolute';
          document.getElementById('container').style.top = `${530}px`;
        }
    }
      
  });

    return (

      <div id="container" className={styles.container}>
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

