import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from './categories-type';
  
const initialState = {
  data: [],
  currentCategory: ''
};
  
export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        data: [...action.categories],
        loading: false
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      }
    default:
      return state;
  }
};
    
export default reducer;
