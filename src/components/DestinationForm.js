import React, { Component } from 'react'
import uuid from 'uuid/v4'
import '../styles/DestinationForm.css';

export class DestinationForm extends Component {

  constructor(props) {
      super(props);

      this.handleStartChange = this.handleStartChange.bind(this);
      this.handleEndChange = this.handleEndChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
        startPostcodeValue: "",
        endPostcodeValue: ""
      }
    }

    handleSubmit(event) {

      var {startPostcodeValue, endPostcodeValue} = this.state;

      this.props.handleSubmit(startPostcodeValue, endPostcodeValue);
      event.preventDefault();
    }

    handleStartChange(event) {

      this.setState({
        ...this.state,
        startPostcodeValue: event.target.value
      });
    }

    handleEndChange(event) {

      this.setState({
        ...this.state,
        endPostcodeValue: event.target.value
      });
    }

    render() {

      var {mileageCost, miles} = this.props;
      var {startPostcodeValue, endPostcodeValue} = this.state;

      return (
        <div className="destination-container">
          <div className="form">
            <input type="text" value={startPostcodeValue} placeholder="Start Postcode" onChange={this.handleStartChange} />
            <input type="text" value={endPostcodeValue} placeholder="Destination Postcode" onChange={this.handleEndChange} />
            <a onClick={this.handleSubmit} className="searchButton"><i className="glyphicon glyphicon-search"></i></a>
            <a onClick={this.handleSubmit} className="searchButton"><i className="glyphicon glyphicon-plus"></i></a>
          </div>
          <div className="details">
            <p>Cost: £{mileageCost}</p>
            <p>Distance: {miles}</p>
          </div>
        </div>
      );
    }
}

export default DestinationForm;
