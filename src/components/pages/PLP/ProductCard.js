import { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import CartBadgeButton from "../../../UI/CartBadgeButton";
import ProductContext from "../../../store/product-context";

import styles from "./ProductCard.module.css";

class ProductCard extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      cartBadgeButtonIsShown: false,
      newPriceAmount: "",
    };
  }

  showCartBadgeButtonHandler() {
    this.setState({ cartIsShown: true });
  }
  hideCartBadgeButtonHandler() {
    this.setState({ cartIsShown: false });
  }
  addToCartHandler(e) {
    e.stopPropagation();
    this.context.addCartItem({
      id: this.props.id,
      item: this.props.title,
      image: this.props.image,
      images: this.props.images,
      brand: this.props.brand,
      description: this.props.description,
      attributes: this.props.attributes,
      category: this.props.category,
      prices: this.props.prices,
      //////////////////////////////////////////////
      amount: 1,
      price: this.props.prices.find(
        (price) => price.currency.symbol === this.props.priceCurrencySymbol
      ).amount,
    });
  }

  render() {
    const isInStock = this.props.inStock === true;
    const isNotInStock = this.props.inStock === false;
    const productCurrentPrice = this.props.prices.find(
      (price) => price.currency.symbol === this.props.priceCurrencySymbol
    ).amount;

    return (
      <li
        className={styles.card}
        onMouseOver={this.showCartBadgeButtonHandler.bind(this)}
        onMouseOut={this.hideCartBadgeButtonHandler.bind(this)}
      >
        {isInStock && (
          <NavLink to={`/products/${this.props.id}`} className={styles.navlink}>
            <div className={styles["image-container"]}>
              <img
                className={styles.image}
                src={this.props.image}
                alt="Item"
              ></img>
            </div>
            <div className={styles.content}>
              <h4 className={styles.title}>{this.props.title}</h4>
              <p className={styles.price}>
                {this.props.priceCurrencySymbol}
                {productCurrentPrice}
              </p>
            </div>
          </NavLink>
        )}

        {isInStock && this.state.cartIsShown && (
          <CartBadgeButton
            onMouseOut={this.hideCartBadgeButtonHandler.bind(this)}
            onAddToCart={this.addToCartHandler.bind(this)}
          ></CartBadgeButton>
        )}

        {isNotInStock && (
          <NavLink to={`/products/${this.props.id}`} className={styles.navlink}>
            <div className={styles["image-container"]}>
              <img
                className={styles.imageoutofstock}
                src={this.props.image}
                alt="Item"
              ></img>
              <span className={styles.outofstock}>OUT OF STOCK</span>
            </div>
            <div className={styles.contentoutofstock}>
              <h4 className={styles.title}>{this.props.title}</h4>
              <p className={styles.price}>
                {this.props.priceCurrencySymbol}
                {productCurrentPrice}
              </p>
            </div>
          </NavLink>
        )}
      </li>
    );
  }
}

export default withRouter(ProductCard);
