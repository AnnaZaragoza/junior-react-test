import React from "react";

const ProductContext = React.createContext({
  cartItems: [],
  currentCurrencies: [],
  cartTotalAmount: 0,
  addCartItem: (item) => {},
  removeCartItem: (id) => {},
});

export default ProductContext;
