import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest(process.env.REACT_APP_DB_URL + '.json' + query, 'GET');
      }
    }, 600);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, sendRequest, inputRef]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = Object.entries(data).map(([key, value]) => ({
        id: key,
        title: value.title,
        amount: value.amount
      }));
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className='search'>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type='text'
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
