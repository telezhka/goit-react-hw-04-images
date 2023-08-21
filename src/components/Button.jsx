import React from 'react';
import PropTypes from 'prop-types';
export const Button = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="load-more-button"
      style={{
        position: 'fixed',
        bottom: '20px',
      }}
    >
      Load More
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func,
};
