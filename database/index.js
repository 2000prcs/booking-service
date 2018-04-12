// create a connection
const mongoose = require('mongoose');

// import db credentials
const config = require('../config.js');

// import csv data
const fs = require('fs');

const path = require('path');

mongoose.connect(`mongodb://${config.DB_ID}:${config.DB_PASSWORD}@ds141889.mlab.com:41889/booking`);

// To connect the db in the shell
// mongo ds141889.mlab.com:41889/booking -u <dbuser> -p <dbpassword>

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB Connected!');
});

// create a schema for DB data
const bookingSchema = mongoose.Schema({

  room_id: Number,
  room_rate: Number,
  booked_dates: [Date], // store booked dates in an array
  // in the future, booked_dates can be [checkin, checkout, guestnumber]
  // guest_number: Number,
  guest_name: String,
  host_name: String,
  discount: Boolean,
  cleaning_fee: Boolean,
  review_count: Number,
  review_grade: Number,
  created_date: { type: Date, default: Date.now },

});

// create a model for the schema
const Room = mongoose.model('room', bookingSchema);


// saving generated data
const save = (callback) => {
  fs.readFile(path.join(__dirname, '../rooms.csv'), (err, rooms)=>{
    let listings = rooms.toString().split('\n');
    callback(listings);
  });
};


// adding booking dates to DB (only booked_dates)
const update = (data) => {

  let newRoom = {
    room_id: data.id,
    booked_dates: data.booked,
    // guest_number: data.guest_number,
    guest_name: data.guest_name,
  };

  Room.findOneAndUpdate({ room_id: data.id }, { $push: { booked_dates: data.booked } }, (err, docs) => {
    if (err) return console.error(err);
    console.log('Data updated :', docs);
  });
};


// fetching data test
const find = (callback) => {
  Room.find((err, rooms) => {
    if (err) return console.error(err);
    console.log(rooms);
    callback(rooms);
  });
};

module.exports = {
  save,
  update,
  find,
};
