// connect express
const express = require('express');

const app = express();

const port = 7777;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// serve client files
app.use(express.static(path.join(__dirname, '/../client')));

// import DB
const db = require('../database');

// GET request
app.get('/booking', (req, res) => {
  res.send('Respond to GET request: ');
});

// POST request
app.post('/booking', (req, res) => {
  res.send('Respond to POST reuqest: ');
});

// listen to the port
app.listen(port, () => console.log(`Server is listening to port ${port}`));
