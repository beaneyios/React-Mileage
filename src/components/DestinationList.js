import React, { Component } from 'react'
import DestinationForm from './DestinationForm.js'
import MileageHelper from '../helpers/MileageHelper.js'
import uuid from 'uuid/v4'
import '../styles/DestinationList.css';

export class DestinationList extends Component {

    render() {

      var totalMiles = this.props.mileages.reduce((acc, mileage) => {
        return acc + MileageHelper.miles(mileage.miles);
      }, 0);

      var claimedMiles = this.props.mileages.reduce((acc, mileage) => {
        var miles = MileageHelper.miles(mileage.miles);
        return acc + MileageHelper.claimedMiles(miles, mileage.claim);
      }, 0);

      return (
        <div>
          <div className="total">
            <h3>Total Miles: {totalMiles} /&nbsp;</h3>
            <h3 className="inactive">Claimed Miles: {claimedMiles}</h3>
          </div>
          {
           this.props.mileages.map((mileage) => {
                return (
                  <div key={uuid()} className="individual-item">
                    <DestinationForm mileage={mileage}
                                     handleSearch={this.props.handleSearch}
                                     handleAdd={this.props.handleAdd}
                                     handleClaimChange={this.props.handleClaimChange} />
                  </div>
                )
            })
          }
        </div>
      )

    }
}

export default DestinationList;
