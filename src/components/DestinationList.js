import React, { Component } from 'react'
import DestinationForm from './DestinationForm.js'
import uuid from 'uuid/v4'
import '../styles/DestinationList.css';

export class DestinationList extends Component {

  constructor(props) {
      super(props);

      this.state = {

      }
    }

    componentDidMount() {

    }

    render() {

      return (
        <div className="individual-item">

          <DestinationForm />
        </div>
      );
    }
}

export default DestinationList;
