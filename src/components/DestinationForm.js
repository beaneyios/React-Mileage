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
        value: ""
      }
    }

    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

    handleStartChange(event) {

      this.setState({value: event.target.value});
    }

    handleEndChange(event) {

      this.setState({value: event.target.value});
    }

    render() {

      return (
        <div className="form">
          <input type="text" className="text-form" value={this.state.value} placeholder="Start Postcode" onChange={this.handleStartChange} />
          <input type="text" className="text-form" value={this.state.value} placeholder="Destination Postcode" onChange={this.handleEndChange} />
          <a onClick={this.handleSubmit} className="button6"><i class="glyphicon glyphicon-search"></i></a>
          <a onClick={this.handleSubmit} className="button6"><i class="glyphicon glyphicon-plus"></i></a>
          
        </div>
      );
    }
}

export default DestinationForm;
