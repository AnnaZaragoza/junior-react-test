import React from "react";

const ProductsContext = React.createContext({
  products: [],
  isLoading: true,
  error: null,
});

export default ProductsContext;
