// create a connection
const mongoose = require('mongoose');

// import db credentials
const config = require('../config.js');

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
  guest_number: Number,
  guest_name: String,
  host_name: String,
  discount: Boolean,
  cleaning_fee: Boolean,
  created_date: { type: Date, default: Date.now },

});

// create a model for the schema
const Room = mongoose.model('room', bookingSchema);

// Test with a fake data
let data = {

  id: 1,
  rate: 45,
  booked: new Date(), // add each booked dates to the booked dates array
  guest_number: 2, // sum number of adult + children
  guest_name: 'Mo',
  host: 'Eric',
  discount: true,
  cleaning: true,

};


// inserting test
const save = (request) => {

  let newRoom = new Room({
    room_id: data.id,
    room_rate: data.rate,
    booked_dates: data.booked,
    guest_number: data.guest_number,
    guest_name: data.guest_name,
    host_name: data.host,
    discount: data.discount,
    cleaning: data.cleaning,
  });

  Room.findOneAndUpdate({ room_id: data.id }, newRoom, { upsert: true }, (err, doc) => {
    if (err) return console.error(err);
    console.log('Data updated :', doc);
  });
};

// fetching data test
const find = () => {
  Room.find((err, Room)=>{
    
  });
};


module.exports = {
  save,
  find,
};
