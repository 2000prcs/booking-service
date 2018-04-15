import React from 'react';
import styles from '../styles.css';


class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: 6,
      cleaning: 14,
    };
  }


  render() {
    return (

      <div>
        <div>
          <span>${this.props.room.room_rate} x {this.props.option.totalDays} nights</span> <span>${this.props.room.room_rate * this.props.option.totalDays}</span>
        </div>
        {this.state.discount ?
          <div>
            <span>{this.state.discount}% weekly price discount</span> <span>-${Math.floor((this.props.room.room_rate * this.props.option.totalDays) * 0.06)}</span>
          </div> : <div> No Discount </div>}
        {this.state.cleaning ?
          <div>
            <span>Cleaning fee</span> <span>${this.state.cleaning}</span>
          </div> : <div> No Cleaning fee </div>}
        <div>
          <span>Service fee</span> <span>${Math.floor((this.props.room.room_rate * this.props.option.totalDays) * 0.12)}</span>
        </div>
        <div>
          <span>Total</span> <span>${651 - 39 + 14 + 78}</span>
        </div>
      </div>

    );
  }
}

export default Price;
