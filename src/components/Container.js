import React, { Component } from 'react'
import MapContainer from './MapContainer.js'
import DestinationList from './DestinationList.js'
import '../styles/Container.css';

class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startPostcode: "",
      endPostcode: ""
    }
  }

  handleSubmit(postcode1, postcode2) {

    this.setState({
      startPostcode: postcode1,
      endPostcode: postcode2
    })
  }

  render() {

    var {startPostcode, endPostcode} = this.state;
    return (

      <div className="Container">
        <div className="panel">
          <MapContainer startLocation={startPostcode} endLocation={endPostcode}/>
        </div>
        <div className="panel">
          <DestinationList handleSubmit={this.handleSubmit.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default Container;
