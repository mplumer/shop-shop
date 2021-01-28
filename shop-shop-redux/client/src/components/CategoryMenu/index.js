import React, { useEffect } from "react";
import { connect } from "react-redux";
import { idbPromise } from "../../utils/helpers";
import { useQuery } from "@apollo/react-hooks";
import {
  updateCategories,
  updateCurrentCategory,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";

// function CategoryMenu({ setCategory }) {
function CategoryMenu({ categories, updateCategories, updateCurrentCategory }) {
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      updateCategories(categoryData.categories);

      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        updateCategories(categories);
      });
    }
  }, [categoryData, loading, updateCategories]);

  const handleClick = (id) => {
    updateCurrentCategory(id);
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
export default connect(
  (state) => ({
    categories: state.categories,
  }),
  {
    updateCategories,
    updateCurrentCategory,
  }
)(CategoryMenu);
