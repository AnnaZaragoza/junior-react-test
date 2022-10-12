import { Component, Fragment } from "react";

import ButtonSecondary from "../../../UI/ButtonSecondary";
import ProductAttributes from "../PDP/ProductAttributes";
import ProductColorAttribute from "../PDP/ProductColorAttribute";
import styles from "./CartProductCard.module.css";

class CartProductCard extends Component {
  constructor() {
    super();
    this.state = {
      productAmount: 1,
      priceAmount: 0,
    };
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

  render() {
    return (
      <Fragment>
        <hr />
        <li className={styles.item}>
          <div className={styles["item-description"]}>
            <h3 className={styles.title}>{this.props.title}</h3>
            <h4 className={styles["title-description"]}>{this.props.brand}</h4>
            <p className={styles.price}>
              {this.props.priceCurrencySymbol}
              {/* {priceAmount} */}
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
      </Fragment>
    );
  }
}

export default CartProductCard;
