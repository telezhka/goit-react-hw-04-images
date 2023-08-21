import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from './Modal';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  key,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = event => {
    event.preventDefault();
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };
  return (
    <a href="./index.html" className="opener" onClick={handleClick}>
      <li key={key}>
        <img src={webformatURL} alt={tags} />
      </li>
      {isModalOpen && (
        <Modal largeImageURL={largeImageURL} tags={tags}></Modal>
        // <div className="backdrop" onClick={this.overlayClickHandler}>
        //   <div className="overlay">
        //     <div className="modal">
        //       <img src={largeImageURL} alt={tags} />
        //     </div>
        //   </div>
        // </div>
      )}
    </a>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  key: PropTypes.number,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
