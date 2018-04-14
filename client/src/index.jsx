import React from 'react';
import ReactDOM from 'react-dom';
import Stars from './components/Stars.jsx';
import Form from './components/Form.jsx';
import Finding from './components/Finding.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './styles.css';

const axios = require('axios');


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    this.getDates();
  }

  getDates() {

    axios.get('/booking')
      .then(items => console.log('Data receiced', items.data))
      .catch(err => console.log('Fetching error', err));

  }


  render() {
    return (

      <div className={styles.container}>

        <div className={styles.component}>
          <span>
            <span className={styles.font}>$46</span>
            <span> per night</span>
          </span>
        </div>
        <div className={styles.component}>
          <Stars />
        </div >
        <MuiThemeProvider>
          <Form />
        </ MuiThemeProvider >
        <div className={styles.component}>
          <Finding />
        </div>
      </div>


    );
  }
}

ReactDOM.render(<App />, document.getElementById('booking'));
