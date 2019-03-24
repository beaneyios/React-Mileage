import React, { Component } from 'react'
import MapContainer from './MapContainer.js'
import DestinationList from './DestinationList.js'
import MileageCalculation from '../Models/MileageCalculation.js'
import uuid from 'uuid/v4'
import '../styles/Container.css';

class Container extends Component {

  constructor(props) {
    super(props);

    var initialMileage = new MileageCalculation(uuid(), "", "", 0, 0.45, false);

    this.state = {
      currentMileageCalculation: initialMileage,
      mileages: [initialMileage],
      reset: false
    }
  }

  handleSearch(newMileage) {
    var newMileages = this.state.mileages.map((mileage) => {

      if(mileage.id == newMileage.id) {
        return newMileage
      }

      return mileage
    })

    this.setState({
      currentMileageCalculation: newMileage,
      mileages: newMileages,
      reset: false
    })
  }

  handleAdd() {

    var newMileage = new MileageCalculation(uuid(), "", "", 0, 0.45, true);
    var mileages = this.state.mileages;
    if(mileages.length > 0) {
      var mostRecent = mileages[mileages.length - 1];

      if(mostRecent.miles === 0) {
        alert("You haven't selected a route yet, choose a route before adding a new item");
        return;
      }

      newMileage.startPostcode = mostRecent.endPostcode;
    }

    mileages.push(newMileage);
    this.setState({
      ...this.state,
      mileages: mileages,
      reset: false
    })
  }

  handleClaimChange(newMileage) {
    var newMileages = this.state.mileages.map((mileage) => {

      if(mileage.id == newMileage.id) {
        return newMileage
      }

      return mileage
    });

    this.setState({
      ...this.state,
      mileages: newMileages,
      reset: false
    })
  }

  routeClicked(selectedMileage, distance) {

    var updatedMileages = this.state.mileages.map((mileage) => {

      if(selectedMileage.id == mileage.id) {
        mileage.miles = distance;
      }

      return mileage;
    });

    this.setState({
      ...this.state,
      mileages: updatedMileages,
      reset: false
    })
  }

  handleResetButtonClicked() {

    var initialMileage = new MileageCalculation(uuid(), "", "", 0, 0.45, false);

    this.setState({
      currentMileageCalculation: initialMileage,
      mileages: [initialMileage],
      reset: true
    });
  }

  render() {

    var {currentMileageCalculation} = this.state;

    return (

      <div className="Container">
        <div className="panel">
          <MapContainer
            calculation={currentMileageCalculation}
            routeClicked={this.routeClicked.bind(this)}
            reset={this.state.reset}
          />
        </div>
        <div className="panel">
          <DestinationList
            handleSearch={this.handleSearch.bind(this)}
            handleAdd={this.handleAdd.bind(this)}
            handleClaimChange={this.handleClaimChange.bind(this)}
            mileages={this.state.mileages}
            handleResetButtonClicked={this.handleResetButtonClicked.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default Container;
