import React from 'react';
import sinon from 'sinon';
import Form from '../src/components/Form.jsx';
import Price from '../src/components/Price.jsx';


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

  test('Should display Price component if showPrice state is true', () => {
    const wrapper = mount( <Form />);
    wrapper.setState({ showPrice: true });
    expect(wrapper.find('#price-component')).toHaveLength(1);
  });

  test('Should not display Price component if showPrice state is false', () => {
    const wrapper = mount( <Form />);
    wrapper.setState({ showPrice: false });
    expect(wrapper.find('#price-component')).toHaveLength(0);
  });

  // increment infant number test

  // if incrementguest calls setuserinfo
});
