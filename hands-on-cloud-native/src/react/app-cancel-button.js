import React, { Component } from 'react';

import './CancelButton.css';

export default class CancelButton extends Component {
  render () {
    return <div className="cancel-button" onClick={() => this.props.onCancel()}>x</div>
  }
}
