// connect express
const express = require('express');

const app = express();

const path = require('path');

const port = 7777;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// serve client files
app.use(express.static(path.join(__dirname, '/../client')));

// import DB
const db = require('../database');

// GET request
app.get('/booking', (req, res) => {
  db.find((data) => {
    console.log('Found data from db:', data);
    res.send('Respond to GET request: ', data);
  });

});


// POST request
app.post('/booking', (req, res) => {
  // Test with a fake data
  let testData = {

    id: 5,
    booked: new Date, // add each booked dates to the booked dates array
    // guest_number: 1, // sum number of adult + children
    guest_name: 'Danny',

  };

  db.update(testData);
  res.send('Respond to POST reuqest: ');
});

// listen to the port
app.listen(port, () => console.log(`Server is listening to port ${port}`));