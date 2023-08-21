import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const SearchForm = ({ onFormSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = e => {
    setInputValue(e.target.value);
  };
  const handleSubmit = async evt => {
    evt.preventDefault();
    console.log(`Search query: ${inputValue}`);
    onFormSubmit(inputValue);
  };
  return (
    <header
      className="searchbar"
      style={{
        position: 'fixed',
        top: 0,
      }}
    >
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          className="input"
          type="text"
          //   autocomplete="off"
          //   autofocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
SearchForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
