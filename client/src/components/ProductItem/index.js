import React from "react";
import { idbPromise } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { addToCart, updateCartQuantity } from "../../utils/actions";
import { useDispatch, useSelector } from "react-redux";

function ProductItem({ item }) {
  const { _id, name, image, price, quantity } = item;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    // if there was a match, call UPDATE with a new purchase quantity
    if (itemInCart) {
      dispatch(
        updateCartQuantity(_id, parseInt(itemInCart.purchaseQuantity) + 1)
      );
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch(addToCart(item));
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
