import {
  UPDATE_PRODUCTS
} from './products-type';

const initialState = {
  data: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PRODUCTS:
        return {
          ...state,
          data: [...action.products]
        };
      default:
        return state;
    }
  };
  
export default reducer;
