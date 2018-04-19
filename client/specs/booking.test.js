import React from 'react';
import sinon from 'sinon';
import Booking from '../src/components/Booking.jsx';
import Form from '../src/components/Form.jsx';
import Price from '../src/components/Price.jsx';

describe('<Booking />', () => {
  test('Should fetch all room data from the server upon mounting', () => {
    sinon.spy(Booking.prototype, 'getRoomData');
    const wrapper = mount( < Booking room={5} /> );
    expect(Booking.prototype.getRoomData.calledOnce).toBe(true);
    Booking.prototype.getRoomData.restore();
  });
});

describe('<Form />', () => {
  test('Should send user info to the server when user clicks the Book button', () => {
    const onButtonClick = sinon.spy();
    sinon.spy(Form.prototype, 'sendBookingRequest');
    const wrapper = mount((
      <Form onButtonClick={onButtonClick} />
    ));
    wrapper.find('button').simulate('click');
    expect(Form.prototype.sendBookingRequest.calledOnce).toBe(true);
    Form.prototype.sendBookingRequest.restore();
  });

  test('Should get/set props for other components', () => {
    const wrapper = mount( <Form totalPrice={150} />);
    expect(wrapper.props().totalPrice).toBe(150);
    wrapper.setProps({ totalPrice: 777 });
    expect(wrapper.props().totalPrice).toBe(777);
  });
});
