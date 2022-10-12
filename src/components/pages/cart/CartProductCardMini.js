import { Component } from "react";

import ButtonSecondary from "../../../UI/ButtonSecondary";
import ProductAttributes from "../PDP/ProductAttributes";
import ProductColorAttribute from "../PDP/ProductColorAttribute";

import styles from "./CartProductCardMini.module.css";

class CartProductCardMini extends Component {
  constructor() {
    super();
    this.state = {
      productAmount: 1,
      priceAmount: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.productAmount !== this.state.productAmount) {
      if (prevState.productAmount < this.state.productAmount) {
        let increasedPriceAmount =
          this.state.priceAmount === 0
            ? this.props.priceAmount
            : this.state.priceAmount;
        increasedPriceAmount += this.props.priceAmount;
        increasedPriceAmount.toFixed(2); // not working?!
        this.setState({ priceAmount: increasedPriceAmount });
      }

      if (prevState.productAmount >= this.state.productAmount) {
        console.log(prevState);

        let decreasedPriceAmount =
          this.state.priceAmount === 0
            ? this.props.priceAmount
            : this.state.priceAmount;
        decreasedPriceAmount -= this.props.priceAmount;
        this.setState({ priceAmount: decreasedPriceAmount });
      }
    }
  }

  increaseProductAmountHandler() {
    const increasedAmount = this.state.productAmount + 1;
    this.setState({
      productAmount: increasedAmount,
    });
  }

  decreaseProductAmountHandler(e) {
    const decreasedAmount = this.state.productAmount - 1;
    if (this.state.productAmount < 1) return; // Remove item from cartOverlay
    this.setState({ productAmount: decreasedAmount });
  }

  increasePriceAmountHandler() {
    let increasedPriceAmount = this.props.priceAmount;
    increasedPriceAmount += this.props.priceAmount;
    this.setState({ priceAmount: increasedPriceAmount });
  }

  decreasePriceAmountHandler() {
    let decreasedPriceAmount = this.props.priceAmount;
    decreasedPriceAmount += this.props.priceAmount;
    this.setState({ priceAmount: decreasedPriceAmount });
  }

  render() {
    const priceAmount =
      this.state.priceAmount === 0
        ? this.props.priceAmount
        : this.state.priceAmount;

    return (
      <li className={styles.item}>
        <div className={styles["item-description"]}>
          <h3 className={styles.title}>{this.props.title}</h3>
          <h4 className={styles["title-description"]}>{this.props.brand}</h4>
          <p className={styles.price}>
            {this.props.priceCurrencySymbol}
            {priceAmount}
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
            <span>{this.state.productAmount}</span>
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
