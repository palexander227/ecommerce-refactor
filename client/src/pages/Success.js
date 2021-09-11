import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { REMOVE_FROM_CART } from '../redux/cart/cart-type';
import { connect } from 'react-redux';

function Success({cart, dispatch}) {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const products = cart.map((item) => item._id);
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
          })
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder, cart, dispatch]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart.data
});

export default connect(mapStateToProps)(Success);

