import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { UPDATE_PRODUCTS } from '../../redux/products/products-type';
import spinner from '../../assets/spinner.gif';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries'; 
import { connect } from 'react-redux';

const ProductList= ({dispatch, currentCategory, products})=> {

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (!loading) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products && products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.data,
  currentCategory: state.categories.currentCategory
});

export default connect(mapStateToProps)(ProductList);
