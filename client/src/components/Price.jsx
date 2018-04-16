import React from 'react';
import styles from '../styles.css';


class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: true,
      discountRate: 6,
      cleaning: true,
      cleaningFee: 14,
    };
  }


  render() {
    const discount = Math.floor(this.props.option.totalPrice * (this.state.discountRate / 100));
    const serviceFee = Math.floor(this.props.option.totalPrice * 0.12);

    return (

      <div>
        <div>
          <span>${this.props.option.totalDays} nights</span> 
          <span>${this.props.option.totalPrice}</span>
        </div>
        {this.state.discount ?
          <div>
            <span>{this.state.discountRate}% weekly price discount</span> <span>-${discount}</span>
          </div> : null}
        {this.state.cleaning ?
          <div>
            <span>Cleaning fee</span> <span>${this.state.cleaningFee}</span>
          </div> : null}
        <div>
          <span>Service fee</span> <span>${serviceFee}</span>
        </div>
        <div>
          <span>Total</span>
          <span>
            ${(this.props.option.totalPrice - discount) + this.state.cleaningFee + serviceFee}
          </span>
        </div>
      </div>

    );
  }
}

export default Price;
