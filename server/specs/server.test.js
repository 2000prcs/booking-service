const request = require('request');
const url = 'http://127.0.0.1:7777';


describe('Server', () => {
  test('should fetch all room data from DB by GET request', () => {
    
    request.get('/booking', (req, res) => {
      db.find((data) => {
        expect(data.length).toBe(100);
      });
    });
  });

  test('should insert a new booking date to DB by POST request', () => {
    server.post('/booking', (req, res) => {

      let testData = {
        id: 21,
        booked: '2018-09-03', // add each booked dates to the booked dates array
        guest_name: 'Mo',
        // guest_number: 1, // sum number of adult + children
      };

      db.update(testData);

      db.findOne(testData.id, (data) => {
        let room = data;
        expect(room.booked_dates[room.booked_dates.length - 1]).toBe('2018-09-03');
      });
    });
  });
});