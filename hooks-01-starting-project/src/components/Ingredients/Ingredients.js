import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import useHttp from '../../hooks/http';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier, clearError } = useHttp();

  useEffect(() => {
    console.log('data', data);
    console.log('reqExtra', reqExtra);
    console.log('reqIdentifier', reqIdentifier);
    console.log('isLoading', isLoading);
    if (!isLoading && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatch({ type: 'ADD', ingredient: { id: data.name, ...reqExtra } });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback(
    ingredient => {
      sendRequest(
        process.env.REACT_APP_DB_URL + '.json',
        'POST',
        JSON.stringify(ingredient),
        ingredient,
        'ADD_INGREDIENT'
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    ingredientID => {
      sendRequest(
        `${process.env.REACT_APP_DB_URL}/${ingredientID}.json`,
        'DELETE',
        null,
        ingredientID,
        'REMOVE_INGREDIENT'
      );
    },
    [sendRequest]
  );

  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />;
  }, [ingredients, removeIngredientHandler]);

  return (
    <div className='App'>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
