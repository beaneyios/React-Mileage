import React, { Component } from 'react'
import '../styles/ClaimToggle.css';

class ClaimToggle extends Component {
  constructor(props) {

    super(props);

    this.setState({
      on: false
    })
  }

  render() {

    return (
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
    )
  }
}

export default ClaimToggle;
