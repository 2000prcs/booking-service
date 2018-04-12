const mongoose = require('mongoose');
//const request = require('request');
const expect = require('chai').expect;
const server = require('../index.js');
const path = require('path');
const supertest = require('supertest');

const request = supertest.agent(server);

describe('Persistent Server', ()=>{
  let dbName = 'booking';
  let dbUrl = `mongodb://localhost:27017/${dbName}`;

  it('Should store a new booking date to the room with a matching id', (done)=>{

    let testServer = 'http://127.0.0.1:7777/booking';
    let data = {
      id: 5,
      booked: new Date,
      guest_name: 'Mo'
    }

    request({
      method: 'POST',
      uri: testServer,
      form: data
    }, (error, response, body) => {
      
      waits(1000);

      runs(()=>{
        mongoose.connect(dbUrl, (err, db)=>{
          let collectionName = 'rooms';
          db.createCollection(collectionName, (err, collection)=>{
            collection.find().toArray((err, results)=>{

              expect(results[0])
            })
          })
        })
      })
    })

  });

})

