import { Component, Fragment } from "react";

import ProductContext from "../../../store/product-context";
import ButtonSecondary from "../../../UI/ButtonSecondary";
import ProductAttributes from "../PDP/ProductAttributes";
import ProductColorAttribute from "../PDP/ProductColorAttribute";
import ImageSlider from "../../../UI/ImageSlider";
import styles from "./CartProductCard.module.css";

class CartProductCard extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      slides: [],
      productAmount: 1,
      priceAmount: 0,
    };
  }

  componentDidMount() {
    let itemsWithPictures = [];

    this.context.cartItems.map((item, index) => {
      itemsWithPictures.push({ id: item.id });
      let pictures = [];
      item.images.forEach((img) => pictures.push(img));
      itemsWithPictures[index].images = pictures;
    });

    this.setState({ slides: itemsWithPictures });
  }

  increaseProductAmountHandler() {
    const increasedAmount = this.state.productAmount + 1;
    this.setState({
      productAmount: increasedAmount,
    });
  }

  decreaseProductAmountHandler(e) {
    const decreasedAmount = this.state.productAmount - 1;
    if (this.state.productAmount < 1) return; // Remove item from cartOverlay -do the same I did for adding a new product in cartItems (from PLP - cardProduct)
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
            <ul className={styles.attributes}>
              <ProductAttributes attributes={this.props.attributes} />
              <ProductColorAttribute attributes={this.props.attributes} />
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
            <ImageSlider slides={this.state.slides} />
          </div>
        </li>
      </Fragment>
    );
  }
}

export default CartProductCard;
