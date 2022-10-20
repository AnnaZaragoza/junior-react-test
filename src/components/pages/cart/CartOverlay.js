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
      totalAmount: 0,
      cartHasItems: false,
    };
  }

  componentDidMount() {
    const hasItems = this.context.cartItems.length > 0;

    this.setState({
      totalAmount: this.context.cartTotalAmount,
      cartHasItems: hasItems,
    });

    // Make the component desappear on scroll down
    window.addEventListener("scroll", this.hideModalHandler.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.context.cartItems.length === 0 && prevState.cartHasItems) {
      this.setState({ cartHasItems: false });
    }
  }

  hideModalHandler() {
    if (window.scrollY > 0) this.setState({ modalIsShown: false });
    else this.setState({ modalIsShown: true });
  }

  changeTotalAmountHandler(price) {
    const updatedCartTotalAmount =
      Number(this.state.totalAmount) + Number(price);

    this.setState({
      totalAmount: Number(updatedCartTotalAmount).toFixed(2),
    });
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
            brand={product.brand}
            attributes={product.attributes}
            ///////////////////////////////////////////
            priceCurrencySymbol={this.props.currency}
            prices={product.prices}
            onGetNewProductPrice={this.changeTotalAmountHandler.bind(this)}
            ///////////////////////////////////////////
            price={product.price}
            amount={product.amount}
          />
        ))
    );

    return (
      <Fragment>
        {this.state.modalIsShown && (
          <Modal onClose={this.props.onClose}>
            <h4 className={styles.title}>My Bag, 0 items</h4>
            <ul className={styles.list}>{cartItemsList}</ul>

            {this.state.cartHasItems && (
              <Fragment>
                <div className={styles.total}>
                  <span>Total Amount</span>
                  <span>
                    {this.props.currency}
                    {this.state.totalAmount}
                  </span>
                </div>
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
              </Fragment>
            )}
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default CartOverlay;
