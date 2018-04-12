const db = require('../../database/index.js');

describe('DB', () => {
  test("should store new booking dates to 'booked_dates' array", () => {
    let testData = {
      id: 9,
      booked: '2018-04-12',
      guest_name: 'Mo',
    };

    db.update(testData);

    db.findOne(testData.id, (data) => {
      let room = data;
      expect(room.booked_dates[room.booked_dates.length - 1]).toBe('2018-04-12');
    });
  });

  test('should find all room data', () => {
    db.find((data) => {
      let rooms = data;
      expect(rooms.length).toBe(100);
    });
  });
});
