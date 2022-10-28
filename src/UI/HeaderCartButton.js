import { Component } from "react";

import Button from "./NavButton";
import CartIcon from "../icons/CartIcon";
import ProductContext from "../store/product-context";

import styles from "./HeaderCartButton.module.css";

class HeaderCartButton extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      badgeIsShown: false,
    };
  }

  showBadgeHandler() {
    this.setState({ badgeIsShown: true });
  }
  hideBadgeHandler() {
    this.setState({ badgeIsShown: true });
  }

  render() {
    const numberOfCartItems = this.context.cartItems.length;

    return (
      <button className={styles.button} onClick={this.props.onClick}>
        <CartIcon className={styles.icon} />
        {!this.state.badgeIsShown && numberOfCartItems > 0 && (
          <span className={styles.badge}>{numberOfCartItems}</span>
        )}
      </button>
    );
  }
}

export default HeaderCartButton;
