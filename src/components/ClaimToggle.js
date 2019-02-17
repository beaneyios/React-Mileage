import React, { Component } from 'react'
import { CSSTransition, transit } from "react-css-transition";
import '../styles/ClaimToggle.css';

class ClaimToggle extends Component {
  constructor(props) {

    super(props);

    this.state = {
      on: props.on
    };
  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.props.checkboxChecked(value);
  }

  render() {

    return (
        <label className="switch">
          <input type="checkbox" onChange={this.handleInputChange.bind(this)} checked={this.props.on}/>
          <span class="slider round"></span>
        </label>
    )
  }
}

export default ClaimToggle;
