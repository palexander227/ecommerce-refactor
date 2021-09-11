import {combineReducers} from 'redux';
import products from './products/products-reducer';
import cart from './cart/cart-reducer';
import categories from './categories/categories-reducer';
 
export default combineReducers({
    products,
    cart,
    categories
});
