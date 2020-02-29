import React, { Component } from 'react';
import axios from 'axios';
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

            let names = [];

            for (let i = 0; i < results.data.length; i++) {
              let value = results.data[i];
              names.push(value.seriesName);
            }

            this.setState({items: names });
      });
  }

  renderUserInfo() {
      if (this.state.items.length > 0) {
        let n = this.state.items.length;
        let series = [];
        for(let i = 0; i < n; i++) {
          let name = this.state.items[i];
          series.push(<Series name={name}/>);
        }
        return series;
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
