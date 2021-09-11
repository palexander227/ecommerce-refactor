import {
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    UPDATE_CART_QUANTITY,
    TOGGLE_CART,
    LOGOUT
  } from './cart-type';
  
  const initialState = {
    data: [],
    cartOpen: false
  };
  
export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...state,
          cartOpen: true,
          data: [...state.data, action.product],
        };
  
      case ADD_MULTIPLE_TO_CART:
        return {
          ...state,
          data: [...state.data, ...action.products],
        };
  
      case UPDATE_CART_QUANTITY:
        return {
          ...state,
          cartOpen: true,
          data: state.data.map(product => {
            if (action._id === product._id) {
              product.purchaseQuantity = action.purchaseQuantity
            }
            return product
          })
        };
  
      case REMOVE_FROM_CART:
        let newState = state.data.filter(product => {
          return product._id !== action._id;
        });
        state.data = [];
        return {
          ...state,
          cartOpen: newState.length > 0,
          data: newState
        };
  
      case CLEAR_CART:
        return {
          ...state,
          cartOpen: false,
          cart: []
        };
  
      case TOGGLE_CART:
        return {
          ...state,
          cartOpen: !state.cartOpen
        };
      case LOGOUT:
        return {
          ...initialState
        }
      default:
        return state;
      }
    };
    
  export default reducer;
  
