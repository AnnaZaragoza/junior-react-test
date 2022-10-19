import { Component } from "react";
import ProductContext from "../../../store/product-context";

import ButtonSecondary from "../../../UI/ButtonSecondary";
import ProductAttributes from "../PDP/ProductAttributes";
import ProductColorAttribute from "../PDP/ProductColorAttribute";

import styles from "./CartProductCardMini.module.css";

class CartProductCardMini extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      productQuantityCounter: 1,
      productCurrentPrice: 0,
      productPrice: 0,
    };
  }

  componentDidMount() {
    // Checking the current price
    const actualProductCurrentPrice = Number(
      this.props.prices.find(
        (price) => price.currency.symbol === this.props.priceCurrencySymbol
      ).amount
    ).toFixed(2);

    this.setState({
      productCurrentPrice: actualProductCurrentPrice,
      productPrice: actualProductCurrentPrice,
    });
  }

  increaseProductAmountHandler() {
    let increaseQuantityCounter = this.state.productQuantityCounter + 1;
    let increasedAmount = this.state.productPrice * increaseQuantityCounter;

    this.setState({
      productCurrentPrice: increasedAmount,
      productQuantityCounter: increaseQuantityCounter,
    });

    // To cartOverlay - amount and single price (to be added to total amount)
    this.props.onGetNewProductPrice(this.state.productPrice);

    // Update cartItems in ProductContext
    this.context.updateCartItem({
      id: this.props.id,
      amount: this.state.productQuantityCounter,
      price: this.state.productPrice,
    });
  }

  decreaseProductAmountHandler() {
    let decreaseQuantityCounter = this.state.productQuantityCounter - 1;
    let decreasedAmount = this.state.productPrice * decreaseQuantityCounter;

    // Remove item from cartOverlay
    if (this.state.productQuantityCounter === 1) {
      this.context.removeCartItem({
        id: this.props.id,
      });
    }

    this.setState({
      productCurrentPrice: decreasedAmount,
      productQuantityCounter: decreaseQuantityCounter,
    });

    // To cartOverlay - amount and single price (to be added to total amount)
    this.props.onGetNewProductPrice(-Math.abs(this.state.productPrice));
  }

  render() {
    return (
      <li className={styles.item}>
        <div className={styles["item-description"]}>
          <h3 className={styles.title}>{this.props.title}</h3>
          <h4 className={styles["title-description"]}>{this.props.brand}</h4>
          <p className={styles.price}>
            {this.props.priceCurrencySymbol}
            {this.props.price}
          </p>
          <ul>
            <ProductAttributes
              className={styles.attributes}
              attributes={this.props.attributes}
            />
            <ProductColorAttribute
              className={styles.attributes}
              attributes={this.props.attributes}
            />
          </ul>
        </div>
        <div className={styles["item-rest"]}>
          <div className={styles["item-amount"]}>
            <ButtonSecondary
              className={styles["item-button"]}
              onClick={this.increaseProductAmountHandler.bind(this)}
            >
              +
            </ButtonSecondary>
            <span>{this.props.amount}</span>
            <ButtonSecondary
              className={styles["item-button"]}
              onClick={this.decreaseProductAmountHandler.bind(this)}
            >
              -
            </ButtonSecondary>
          </div>

          <img
            className={styles["item-image"]}
            src={this.props.image}
            alt={this.props.title}
          ></img>
        </div>
      </li>
    );
  }
}

export default CartProductCardMini;
