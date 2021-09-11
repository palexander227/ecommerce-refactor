import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../redux/categories/categories-type';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { connect } from 'react-redux';

function CategoryMenu({categories, dispatch}) {

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (!loading) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories.data
});

export default connect(mapStateToProps)(CategoryMenu);
