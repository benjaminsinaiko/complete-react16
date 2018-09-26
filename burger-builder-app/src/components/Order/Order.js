import React from 'react';

import styles from './Order.module.css';

const order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span key={ig.name} className={styles.Ingredients}>
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={styles.Order}>
      <p>{ingredientOutput}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
