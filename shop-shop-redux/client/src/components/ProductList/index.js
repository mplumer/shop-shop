import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { connect } from "react-redux";
import { updateProducts } from "../../utils/actions";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif"

function ProductList({ products, currentCategory, updateProducts }) {
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // let's store it in the global state object
      updateProducts(data.products);

      // but let's also take each product and save it to IndexedDB using the helper function
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `products` store
      idbPromise("products", "get").then((products) => {
        // use retrieved data to set global state for offline browsing
        updateProducts(products);
      });
    }
  }, [data, loading, updateProducts]);

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
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              item={product}
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

export default connect(
  (state) => ({
    currentCategory: state.currentCategory,
    products: state.products,
  }),
  {
    updateProducts,
  }
)(ProductList);
