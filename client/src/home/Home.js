import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Series from "../series/Series";

class Home extends Component {
  constructor(props) {
		super(props);
    this.state = {value: ''};
    this.state = props.hasData
    this.state = {
			items: [],
		};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentWillReceiveProps(nextProps) {}

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();

    axios.post('api/search', { value: this.state.value })
          .then((result) => {

            let results = JSON.parse(result.data.result);
            // console.log(results);
            var small = [];
            _.map(results, (item) => {
              return item.seriesName;
            });

            this.setState({items: results });
      });
  }

  renderUserInfo() {
      if (this.state.items.length > 0) {
        this.state.items.forEach((item) => {
          let s = item
          return <Series name={s} />
        });
      } else {
        let s = "Raque"
        return <Series name={s} />
      }
    }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Series Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        {this.renderUserInfo()}
      </div>

    );
  }
}

export default Home;
