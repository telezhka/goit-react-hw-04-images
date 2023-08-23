import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CirclesWithBar } from 'react-loader-spinner';
import { ImageGallery } from './ImageGallery';
import { SearchForm } from './Searchbar';
import { Button } from './Button';

axios.defaults.baseURL = 'https://pixabay.com/api/';
export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   const savedInputValue = localStorage.getItem('inputValue');
  //   if (savedInputValue) {
  //     setInputValue(savedInputValue);
  //   }
  // }, []);

  const handleSubmit = submittedValue => {
    console.log('Значення, передане з дитячого компонента:', submittedValue);
    setInputValue(submittedValue);
    setPage(1);
    setPictures([]);
    // localStorage.setItem('inputValue', submittedValue);
  };
  // useEffect(() => {
  //   setIsLoading(true);
  //   async function isLoadingAsy() {
  //     try {
  //       const response = await axios.get(
  //         `?q=${inputValue}&page=1&key=37812301-bb78e35e415e6149d67a423b2&image_type=photo&orientation=horizontal&per_page=12`
  //       );
  //       setPictures(response.data.hits);
  //       setTotal(response.data.totalHits);
  //       setIsLoading(false);
  //       console.log(response);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setIsLoading(false);
  //     }
  //   }
  //   isLoadingAsy();
  // }, [inputValue]);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      async function pageAsy() {
        try {
          const response = await axios.get(
            `?q=${inputValue}&page=${page}&key=37812301-bb78e35e415e6149d67a423b2&image_type=photo&orientation=horizontal&per_page=12`
          );
          setPictures(prevPictures => [...prevPictures, ...response.data.hits]);
          setTotal(response.data.totalHits);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      }
      pageAsy();
    }
  }, [page, inputValue]);
  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
    console.log(page);
  };
  const hasImages = pictures.length > 0;
  const totalPagesUnrounded = total / 12;
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
      {<SearchForm onFormSubmit={handleSubmit}></SearchForm>}
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
            onClick={loadMoreImages}
            // hasImages={hasImages}
            // isLastPage={isLastPage}
          />
        ) : null
      ) : null}
    </div>
  );
  // }
};
