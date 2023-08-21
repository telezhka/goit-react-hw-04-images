import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from './Modal';

export class ImageGalleryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  handleClick = event => {
    event.preventDefault();
    this.openModal();
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleKeyDown);
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.closeModal();
    }
  };

  // overlayClickHandler = event => {
  //   if (event.target === event.currentTarget) {
  //     this.closeModal();
  //   }
  // };

  render() {
    const { id, webformatURL, largeImageURL, tags } = this.props;
    const { isModalOpen } = this.state;

    return (
      <a href="./index.html" className="opener" onClick={this.handleClick}>
        <li key={id}>
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
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
