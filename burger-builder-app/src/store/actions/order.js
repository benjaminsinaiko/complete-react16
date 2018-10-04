import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, data) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = orderData => {
  return dispatch => {
    axios
      .post('/orders.json', order)
      .then(response => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};
