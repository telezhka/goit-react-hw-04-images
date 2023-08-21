import PropTypes from 'prop-types';

export const Modal = ({ largeImageURL, tags }) => {
  return (
    <div className="backdrop">
      <div className="overlay">
        <div className="modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
