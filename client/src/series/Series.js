import React, { Component } from 'react';
import axios from 'axios';

class Series extends Component {
  constructor(props) {
		super(props);
	}

  render() {
    return (
      <div>
        {console.log(this.props.name)}
        <p>{this.props.name}</p>
      </div>
    );
  }
}

export default Series;
