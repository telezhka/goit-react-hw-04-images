import React, { Component } from 'react';
import axios from 'axios';
import { CirclesWithBar } from 'react-loader-spinner';
import { ImageGallery } from './ImageGallery';
import { SearchForm } from './Searchbar';
import { Button } from './Button';

axios.defaults.baseURL = 'https://pixabay.com/api/';
export class App extends Component {
  state = {
    pictures: [],
    isLoading: false,
    inputValue: '',
    page: 1,
    total: 0,
  };
  handleSubmit = submittedValue => {
    console.log('Значення, передане з дитячого компонента:', submittedValue);
    this.setState({ inputValue: submittedValue });
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.inputValue !== this.state.inputValue) {
      this.setState({ isLoading: true });

      try {
        const response = await axios.get(
          `?q=${this.state.inputValue}&page=1&key=37812301-bb78e35e415e6149d67a423b2&image_type=photo&orientation=horizontal&per_page=12`
        );

        this.setState({
          pictures: response.data.hits,
          total: response.data.totalHits,
          isLoading: false,
        });
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      }
    } else if (prevState.page !== this.state.page) {
      const { inputValue, page } = this.state;

      this.setState({ isLoading: true });

      try {
        const response = await axios.get(
          `?q=${inputValue}&page=${page}&key=37812301-bb78e35e415e6149d67a423b2&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...response.data.hits],
          isLoading: false,
        }));
        // console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      }
    }
  }
  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log(this.state.page);
  };
  render() {
    const { pictures, isLoading, page } = this.state;
    const hasImages = pictures.length > 0;
    const totalPagesUnrounded = this.state.total / 12;
    const totalPages = Math.ceil(totalPagesUnrounded);
    const isLastPage = page >= totalPages;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        {<SearchForm onFormSubmit={this.handleSubmit}></SearchForm>}
        {isLoading ? (
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
        ) : (
          <ImageGallery pictures={pictures} />
        )}
        {!isLastPage ? (
          hasImages ? (
            <Button
              onClick={this.loadMoreImages}
              // hasImages={hasImages}
              // isLastPage={isLastPage}
            />
          ) : null
        ) : null}
      </div>
    );
  }
}
