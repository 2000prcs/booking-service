// connect express
const express = require('express');

const app = express();
// CORS
const cors = require('cors');

app.use(cors());

const path = require('path');

const port = 7777;

const bodyParser = require('body-parser');

app.use(bodyParser.json());


// serve client files
app.use(express.static(path.join(__dirname, '/../client/dist')));

// import DB
const db = require('../database');

// GET request
app.get('/booking/:room_id', (req, res) => {
  db.findOne(req.params.room_id, (error, data) => {
    if (error) {
      res.sendStatus(404);
      res.send(error);
    } else {
      res.send(data);
    }
  });
});


// POST request
app.post('/booking', (req, res) => {
  db.update(req.body, (error, data) => {
    if (error) {
      res.sendStatus(404);
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

// listen to the port
app.listen(port, () => console.log(`Server is listening to port ${port}`));


// export module
module.exports = app;
