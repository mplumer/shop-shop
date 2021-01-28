export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const TOGGLE_CART = 'TOGGLE_CART';

export const updateProducts = (products) => ({
    type: UPDATE_PRODUCTS,
    products,
  });
  
  export const updateCategories = (categories) => ({
    type: UPDATE_CATEGORIES,
    categories,
  });
  
  export const updateCurrentCategory = (currentCategory) => ({
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory,
  });
  
  export const addToCart = (item) => ({
    type: ADD_TO_CART,
    product: { ...item, purchaseQuantity: 1 },
  });
  
  export const addMultipleToCart = (cart) => ({
    type: ADD_MULTIPLE_TO_CART,
    products: [...cart],
  });
  
  export const removeFromCart = (_id) => ({
    type: REMOVE_FROM_CART,
    _id,
  });
  
  export const updateCartQuantity = (_id, purchaseQuantity) => ({
    type: UPDATE_CART_QUANTITY,
    _id,
    purchaseQuantity,
  });
  
  export const clearCart = (cart) => ({
    type: CLEAR_CART,
    products: [...cart],
  });
  
  export const toggleCart = (cart) => ({
    type: TOGGLE_CART,
    cart,
  });
