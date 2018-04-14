import React from 'react';
import styles from '../styles.css';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      total: 0,
    };
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ value });
    //this.setState({})
  }

  render() {
    return (
      <div className={styles.component}>
        <div>
          <span>Dates</span>
          <Calendar />
        </div>      
        <div>
          <span>Guests</span>
        </div>
        <div>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={0} label={this.state.total} primaryText="Adults" />
            <MenuItem value={1} label={this.state.total} primaryText="Children" />
            <MenuItem value={2} label={this.state.total} primaryText="Infants" />
          </DropDownMenu>
        </div>
        <div>
          <span>$48 x 8 nights</span> <span>$387</span>
        </div>
        <div>
          <span>6% weekly price discount</span> <span>-$23</span>
        </div>
        <div>
          <span>Cleaning fee</span> <span>$14</span>
        </div>
        <div>
          <span>Service fee</span> <span>$45</span>
        </div>
        <div>
          <span>Total</span> <span>$423</span>
        </div>
        <div>
          <button className={styles.button}>Book</button>
        </div>
      </div>

    )
  };

}



const Calendar = (props) => (
  
  <div>
    <input type="date" />
  </div>
  
);
