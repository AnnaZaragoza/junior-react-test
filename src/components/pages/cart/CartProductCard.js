import { Component, Fragment } from 'react';

import ProductContext from '../../../store/product-context';
import ButtonSecondary from '../../../UI/ButtonSecondary';
import ProductAttributes from '../PDP/ProductAttributes';
import ProductColorAttribute from '../PDP/ProductColorAttribute';
import ImageSlider from '../../../UI/ImageSlider';
import styles from './CartProductCard.module.css';

class CartProductCard extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      // // Images
      // slides: [],
      // Price change
      productQuantityCounter: 1,
      productCurrentPrice: 0,
      productPrice: 0,
    };
  }

  componentDidMount() {
    // // Images
    // let itemsWithPictures = [];
    // this.context.cartItems.map((item, index) => {
    //   itemsWithPictures.push({ id: item.id });
    //   let pictures = [];
    //   item.images.forEach((img) => pictures.push(img));
    //   itemsWithPictures[index].images = pictures;
    // });

    // Price
    const actualProductCurrentPrice = this.context.cartItems.map(
      (item) => item.prices.find((price) => price.currency.symbol === this.props.priceCurrencySymbol).amount
    );

    this.setState({
      // slides: itemsWithPictures,
      productQuantityCounter: this.props.amount,
      productCurrentPrice: this.props.price,
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

    // To cartBag - single price (to be added to total amount)
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

    this.setState({
      productCurrentPrice: decreasedAmount,
      productQuantityCounter: decreaseQuantityCounter,
    });

    // To cartBag - single price (to be added to total amount)
    this.props.onGetNewProductPrice(-Math.abs(this.state.productPrice));

    // Update cartItems in ProductContext
    this.context.updateCartItem({
      id: this.props.id,
      amount: -Math.abs(this.state.productQuantityCounter),
      price: this.state.productPrice,
    });

    // Remove item from cartOverlay / cartBag
    if (this.state.productQuantityCounter === 1) {
      this.context.removeCartItem({
        id: this.props.id,
      });
    }
  }

  render() {
    return (
      <Fragment>
        <hr />
        <li className={styles.item}>
          <div className={styles['item-description']}>
            <h3 className={styles.title}>{this.props.title}</h3>
            <h4 className={styles['title-description']}>{this.props.brand}</h4>
            <p className={styles.price}>
              {this.props.priceCurrencySymbol}
              {this.state.productCurrentPrice}
            </p>
            <ul className={styles.attributes}>
              <ProductAttributes attributes={this.props.attributes} />
              <ProductColorAttribute attributes={this.props.attributes} />
            </ul>
          </div>
          <div className={styles['item-rest']}>
            <div className={styles['item-amount']}>
              <ButtonSecondary className={styles['item-button']} onClick={this.increaseProductAmountHandler.bind(this)}>
                +
              </ButtonSecondary>
              <span>{this.state.productQuantityCounter}</span>
              <ButtonSecondary className={styles['item-button']} onClick={this.decreaseProductAmountHandler.bind(this)}>
                -
              </ButtonSecondary>
            </div>
            <ImageSlider
            // slides={this.state.slides}
            />
          </div>
        </li>
      </Fragment>
    );
  }
}

export default CartProductCard;
