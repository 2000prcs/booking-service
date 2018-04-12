const db = require('../../database/index.js');

describe('DB', () => {
  test('Should store a new booking date to the room user has selected', () => {
    let testData = {
      id: 21,
      booked: '2018-02-20',
      guest_name: 'Eric',
    };

    db.update(testData);

    db.findOne(testData.id, (data) => {
      let room = data;
      expect(room.booked_dates[room.booked_dates.length - 1]).toBe('2018-02-20');
    });
  });

  test('Should find all rooms data', () => {
    db.find((data) => {
      let rooms = data;
      expect(rooms.length).toBe(100);
    });
  });
});
