import { Component } from 'react';
import ProductContext from './product-context';

class ProductProvider extends Component {
  constructor() {
    super();

    this.state = {
      item: {},
      cartItems: [],
      cartTotalAmount: 0,
    };
  }

  addCartItemToCartHandler(cartItem) {
    // Total amount
    const updatedCartTotalAmount = this.state.cartTotalAmount + cartItem.price * cartItem.amount;

    // CartItems
    const existingCartItemIndex = this.state.cartItems.findIndex((i) => i.id === cartItem.id);
    const existingCartItem = this.state.cartItems[existingCartItemIndex];

    let updatedCartItems;
    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
      };
      updatedCartItems = [...this.state.cartItems];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCartItems = this.state.cartItems.concat(cartItem);
    }

    this.setState({
      cartItems: updatedCartItems,
      cartTotalAmount: updatedCartTotalAmount,
    });

    console.log(updatedCartItems);
    // Save the data in local storage
    localStorage.setItem('cartProducts', JSON.stringify(updatedCartItems));
    // Save changed total amount in LS
    localStorage.setItem('cartTotalAmount', JSON.stringify(updatedCartTotalAmount));
  }

  removeCartItemFromCartHandler(cartItem) {
    const existingCartItemIndex = this.state.cartItems.findIndex((i) => i.id === cartItem.id);
    const existingCartItem = this.state.cartItems[existingCartItemIndex];

    let updatedCartItems;
    if (existingCartItem) {
      updatedCartItems = this.state.cartItems.filter((i) => i.id !== cartItem.id);
    } else {
      const updatedCartItem = {
        ...existingCartItem,
      };
      updatedCartItems = [...this.state.cartItems];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    }

    const updatedCartTotalAmount = this.state.cartTotalAmount - existingCartItem.price;

    this.setState({
      cartItems: updatedCartItems,
      cartTotalAmount: updatedCartTotalAmount,
    });

    console.log(updatedCartItems);
    // Save the data in local storage
    localStorage.setItem('cartProducts', JSON.stringify(updatedCartItems));
  }

  updateCartItemFromCartHandler(cartItem) {
    let currentAmount;
    if (cartItem.amount > 0) currentAmount = cartItem.amount + 1;
    else if (cartItem.amount < 0) currentAmount = Math.abs(cartItem.amount) - 1;
    const currentPrice = cartItem.price * currentAmount;

    const existingCartItemIndex = this.state.cartItems.findIndex((i) => i.id === cartItem.id);
    const existingCartItem = this.state.cartItems[existingCartItemIndex];

    let updatedCartItems;
    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        amount: currentAmount,
        price: currentPrice,
      };
      updatedCartItems = [...this.state.cartItems];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    }

    this.setState({
      cartItems: updatedCartItems,
    });

    console.log(updatedCartItems);
    // Save the data in local storage
    localStorage.setItem('cartProducts', JSON.stringify(updatedCartItems));
  }

  render() {
    const productContext = {
      cartItems: this.state.cartItems,
      cartTotalAmount: this.state.cartTotalAmount,
      addCartItem: this.addCartItemToCartHandler.bind(this),
      removeCartItem: this.removeCartItemFromCartHandler.bind(this),
      updateCartItem: this.updateCartItemFromCartHandler.bind(this),
    };

    return <ProductContext.Provider value={productContext}>{this.props.children}</ProductContext.Provider>;
  }
}

export default ProductProvider;
