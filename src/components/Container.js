import React, { Component } from 'react'
import MapContainer from './MapContainer.js'
import '../styles/Container.css';

class Container extends Component {

  render() {

    return (
      <div className="Container">
        <div className="left-container">
          <MapContainer startLocation="TN233LN" endLocation="TN235GE"/>
        </div>
      </div>
    )
  }
}

export default Container;
