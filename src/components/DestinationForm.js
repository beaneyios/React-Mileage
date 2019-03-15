import React, { Component } from 'react'
import ClaimToggle from './ClaimToggle.js'
import MileageHelper from '../helpers/MileageHelper.js'
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

    handleSearchButtonClicked(event) {
      this.handleSearch();
      event.preventDefault();
    }

    handleSearch() {
      var {mileage} = this.state;

      if(mileage.startPostcode === "") {
        alert("You didn't enter a start location");
        return;
      }

      if(mileage.endPostcode === "") {
        alert("You didn't enter a destination");
        return;
      }

      this.props.handleSearch(mileage);
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
      var newMileage = JSON.parse(JSON.stringify(mileage));
      newMileage.endPostcode = event.target.value;

      this.setState({
        mileage: newMileage
      });
    }

    checkboxChecked(checked) {
      this.updatedCheckBox(checked);
    }

    updatedCheckBox(checked) {
      var {mileage} = this.state;
      mileage.claim = checked;
      this.props.handleClaimChange(mileage);
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

    keyPressed(event) {
      if(event.key === "Enter") {
        this.handleSearch()
      }
    }

    render() {

      var {mileageCost, miles, claim} = this.state.mileage;
      var {startPostcode, endPostcode} = this.state.mileage;

      var roundedMiles = MileageHelper.miles(miles);
      var claimedMiles = MileageHelper.claimedMiles(roundedMiles, claim);

      return (
        <div className="destination-container">
          <div className="form">
            <div className="form-container">
              <input onKeyPress={this.keyPressed.bind(this)} type="text" value={startPostcode} placeholder="Start Postcode" onChange={this.handleStartChange} />
              <input onKeyPress={this.keyPressed.bind(this)} type="text" value={endPostcode} placeholder="Destination Postcode" onChange={this.handleEndChange} />
            </div>
            <div className="button-container">
              <a onClick={this.handleSearchButtonClicked} className="searchButton"><i className="glyphicon glyphicon-search"></i></a>
              <a onClick={this.handleAdd} className="searchButton"><i className="glyphicon glyphicon-plus"></i></a>
            </div>
          </div>
          <div className="details">
            <span className="line">
              <b>Distance:&nbsp;</b> {roundedMiles}&nbsp;/ <span className="totalMiles">&nbsp;{claimedMiles} (claimed)</span>
            </span>
            <span className="line">
              <b>Claim:</b><ClaimToggle on={claim} checkboxChecked={this.checkboxChecked.bind(this)}/>
            </span>
          </div>
        </div>
      );
    }
}

export default DestinationForm;
