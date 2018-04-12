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
    res.send(data);
  });
});


// POST request
app.post('/booking', (req, res) => {
  db.update(req.body);
  res.send(req.body);
});

// listen to the port
app.listen(port, () => console.log(`Server is listening to port ${port}`));


// export module
module.exports = app;