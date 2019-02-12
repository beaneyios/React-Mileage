import React, { Component } from 'react'
import DestinationForm from './DestinationForm.js'
import uuid from 'uuid/v4'
import '../styles/DestinationList.css';

export class DestinationList extends Component {

  constructor(props) {
      super(props);
    }

    componentDidMount() {

    }

    render() {

      return (
        <div className="individual-item">

          <DestinationForm mileageCost={0.45} miles={500} handleSubmit={this.props.handleSubmit}/>
        </div>
      );
    }
}

export default DestinationList;
