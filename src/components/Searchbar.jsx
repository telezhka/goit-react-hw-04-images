import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // pictures: [],
      // isLoading: false,
      inputValue: '',
      // page: 1,
    };
  }
  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log(`Search query: ${this.state.inputValue}`);
    this.props.onFormSubmit(this.state.inputValue);
  };

  render() {
    return (
      <header
        className="searchbar"
        style={{
          position: 'fixed',
          top: 0,
        }}
      >
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            //   autocomplete="off"
            //   autofocus
            placeholder="Search images and photos"
            value={this.inputValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
