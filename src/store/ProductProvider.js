import { Component } from "react";
import ProductContext from "./product-context";

class ProductProvider extends Component {
  constructor() {
    super();

    this.state = {
      item: {},
      cartItems: [],
      cartTotalAmount: 0,
    };

    this.addCartItemToCartHandler.bind(this);
    this.removeCartItemFromCartHandler.bind(this);
  }

  componentDidUpdate() {
    console.log(this.state.cartItems);
    // Check if the currency changes:
    const currentCurrency = this.state.cartItems
      .map((item) => item.priceCurrencySymbol)
      .filter((v, i, p) => p.indexOf(v) === i);

    // if (currentCurrency[1]) console.log("Currency has change!!");

    // // Change updatedCartItems with the newCurrency (check in LocalStorage to get the new pricesAmount)
    // const newAmounts = JSON.parse(localStorage.getItem("products"));
    // console.log(newAmounts);
  }

  addCartItemToCartHandler(cartItem) {
    console.log(cartItem);
    const updatedCartTotalAmount =
      this.state.cartTotalAmount + cartItem.price * cartItem.amount;

    // // Check if the currency has changed
    // const cartItemCurrency = cartItem.priceCurrencySymbol;
    // this.state.currentCurrencies.push(cartItemCurrency);
    // const changedCurrency = this.state.currentCurrencies.filter(
    //   (v, i, p) => p.indexOf(v) === i
    // )[1];

    // // Change price amount of existing cartItems
    // const itemsId = this.state.cartItems.map((v) => v.id);
    // const savedItems = JSON.parse(localStorage.getItem("products"));
    // const itemsIdToBeModified = savedItems
    //   .map((item) => item.id)
    //   .filter((v) => itemsId.indexOf(v) !== -1);
    // const itemsToBeModified = savedItems.filter((item) =>
    //   itemsIdToBeModified.includes(item.id)
    // );

    // // Modify priceAmount from itemsToBeModified
    // const newCurrencyIndex = itemsToBeModified
    //   .map((item) =>
    //     item.prices
    //       .map((price) => price.currency)
    //       .map((c) => c.symbol)
    //       .findIndex((s) => s === changedCurrency)
    //   )
    //   .find((v) => v !== -1);

    // const newPriceAmounts = itemsToBeModified
    //   .map((item) => item.prices.map((price) => price.amount))
    //   .map((a) => a[newCurrencyIndex]);
    // console.log(newPriceAmounts);

    // console.log(this.state.cartItems);
    // const updatingPriceAmountsInCartItems = {
    //   ...this.state.cartItems.map((item) => item),
    //   newPriceAmounts: newPriceAmounts,
    // };
    // console.log(updatingPriceAmountsInCartItems);

    // // Add those items to the cartItems state

    // // Perform the rest as it was

    // this.state.cartItems.push(cartItem);
    // console.log(this.state.cartItems);

    const existingCartItemIndex = this.state.cartItems.findIndex(
      (i) => i.id === cartItem.id
    );
    const existingCartItem = this.state.cartItems[existingCartItemIndex];
    let updatedCartItems;

    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + cartItem.amount,
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
  }

  removeCartItemFromCartHandler(cartItem) {
    const existingCartItemIndex = this.state.cartItems.findIndex(
      (i) => i.id === cartItem.id
    );

    const existingCartItem = this.state.cartItems[existingCartItemIndex];

    const updatedCartTotalAmount =
      this.state.cartTotalAmount - existingCartItem.price;
    let updatedCartItems;

    if (existingCartItem.amount === 1) {
      updatedCartItems = this.state.cartItems.filter(
        (i) => i.id !== cartItem.id
      );
    } else {
      const updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedCartItems = [...this.state.cartItems];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    }

    this.setState({
      cartItems: updatedCartItems,
      cartTotalAmount: updatedCartTotalAmount,
    });
  }

  render() {
    const productContext = {
      cartItems: this.state.cartItems,
      cartTotalAmount: this.state.cartTotalAmount,
      addCartItem: this.addCartItemToCartHandler.bind(this),
      removeCartItem: this.removeCartItemFromCartHandler.bind(this),
    };

    return (
      <ProductContext.Provider value={productContext}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default ProductProvider;
