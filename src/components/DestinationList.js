import React, { Component } from 'react'
import DestinationForm from './DestinationForm.js'
import uuid from 'uuid/v4'
import '../styles/DestinationList.css';

export class DestinationList extends Component {

    render() {
        return (
          <div>
            {
             this.props.mileages.map((mileage) => {
                  return (
                    <div key={uuid()} className="individual-item">
                      <DestinationForm mileage={mileage}
                                       handleSearch={this.props.handleSearch}
                                       handleAdd={this.props.handleAdd}/>
                    </div>
                  )
              })
            }
          </div>
        )

    }
}

export default DestinationList;
