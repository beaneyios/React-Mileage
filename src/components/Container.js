import React, { Component } from 'react'
import MapContainer from './MapContainer.js'
import DestinationList from './DestinationList.js'
import '../styles/Container.css';

class Container extends Component {

  render() {

    return (
      <div className="Container">
        <div className="panel">
          <MapContainer startLocation="TN233LN" endLocation="TN235GE"/>
        </div>
        <div className="panel">
          <DestinationList />
        </div>
      </div>
    )
  }
}

export default Container;
