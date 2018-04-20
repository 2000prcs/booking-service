import React from 'react';
import sinon from 'sinon';
import Booking from '../src/components/Booking.jsx';


describe('<Booking />', () => {
  test('Should fetch all room data from the server upon mounting', () => {
    sinon.spy(Booking.prototype, 'getRoomData');
    const wrapper = mount( < Booking room={5} /> );
    expect(Booking.prototype.getRoomData.calledOnce).toBe(true);
    Booking.prototype.getRoomData.restore();
  });

  //componentdidupdate test

  
});
