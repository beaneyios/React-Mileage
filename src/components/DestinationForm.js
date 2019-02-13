import React, { Component } from 'react'
import ClaimToggle from './ClaimToggle.js'
import uuid from 'uuid/v4'
import '../styles/DestinationForm.css';

export class DestinationForm extends Component {

  constructor(props) {
      super(props);

      this.handleStartChange = this.handleStartChange.bind(this);
      this.handleEndChange = this.handleEndChange.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleSearch = this.handleSearch.bind(this);

      this.state = {
        mileage: props.mileage
      }
    }

    handleSearch(event) {

      var {mileage} = this.state;
      this.props.handleSearch(mileage);
      event.preventDefault();
    }

    handleAdd(event) {

      this.props.handleAdd();
      event.preventDefault();
    }

    handleStartChange(event) {

      var {mileage} = this.state;
      var newMileage = JSON.parse(JSON.stringify(mileage));

      newMileage.startPostcode = event.target.value;

      this.setState({
        mileage: newMileage
      });
    }

    handleEndChange(event) {

      var {mileage} = this.state;
      mileage.endPostcode = event.target.value;

      this.setState({
        mileage: mileage
      });
    }

    isEmpty(value) {

      return value == undefined || value == null || value === "";
    }

    roundedTwoDecimals(value) {
      if(value === 0) {
        return value
      }

      return Math.floor(value * 100) / 100
    }

    render() {

      var {mileageCost, miles} = this.state.mileage;
      var {startPostcode, endPostcode} = this.state.mileage;

      var convertedMiles = miles / 1600;
      var calculatedCost = mileageCost * convertedMiles;

      var roundedMiles = this.roundedTwoDecimals(convertedMiles)
      var roundedCost = this.roundedTwoDecimals(calculatedCost)

      return (
        <div className="destination-container">
          <div className="form">
            <div className="form-container">
              <input type="text" value={startPostcode} placeholder="Start Postcode" onChange={this.handleStartChange} />
              <input type="text" value={endPostcode} placeholder="Destination Postcode" onChange={this.handleEndChange} />
            </div>
            <div className="button-container">
              <a onClick={this.handleSearch} className="searchButton"><i className="glyphicon glyphicon-search"></i></a>
              <a onClick={this.handleAdd} className="searchButton"><i className="glyphicon glyphicon-plus"></i></a>
            </div>
          </div>
          <div className="details">
            <span><b>DISTANCE:</b> {roundedMiles}</span>
            <span><b>CLAIM:</b><ClaimToggle /></span>
          </div>
        </div>
      );
    }
}

export default DestinationForm;
