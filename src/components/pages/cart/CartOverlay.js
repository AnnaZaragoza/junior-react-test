import { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";

import Modal from "../../../UI/Modal";
import ProductContext from "../../../store/product-context";
import CartProductCardMini from "./CartProductCardMini";
import Button from "../../../UI/Button";

import styles from "./CartOverlay.module.css";

class CartOverlay extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      modalIsShown: true,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.hideModalHandler.bind(this));
  }

  hideModalHandler() {
    if (window.scrollY > 0) this.setState({ modalIsShown: false });
    else this.setState({ modalIsShown: true });
  }

  getProductAmount() {
    console.log(this.props.productAmount);
  }

  render() {
    const cartItemsList = this.context.cartItems.map(
      (product) =>
        (product = (
          <CartProductCardMini
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.item}
            priceCurrencySymbol={this.props.currency}
            priceAmount={product.price}
            brand={product.brand}
            attributes={product.attributes}
          />
        ))
    );

    const totalAmount = this.context.cartTotalAmount;
    const hasItems = this.context.cartItems.length > 0;

    return (
      <Fragment>
        {this.state.modalIsShown && (
          <Modal onClose={this.props.onClose}>
            <h4 className={styles.title}>My Bag, 0 items</h4>
            <ul className={styles.list}>{cartItemsList}</ul>

            {hasItems && (
              <div className={styles.total}>
                <span>Total Amount</span>
                <span>
                  {this.props.currency}
                  {totalAmount.toFixed(2)}
                </span>
              </div>
            )}

            {hasItems && (
              <div className={styles.actions}>
                <NavLink
                  className={styles.button}
                  to={"/products/cart-bag"}
                  onClick={this.props.onClose}
                >
                  VIEW BAG
                </NavLink>
                <Button onClick={this.props.onClose}>CHECK OUT</Button>
              </div>
            )}
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default CartOverlay;
