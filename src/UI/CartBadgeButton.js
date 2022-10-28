import { Component } from "react";

import CartIcon from "../icons/CartIcon";
import Button from "./ButtonSecondary";

import styles from "./CartBadgeButton.module.css";

class CartBadgeButton extends Component {
  render() {
    return (
      <Button className={styles.button} onClick={this.props.onAddToCart}>
        <CartIcon className={styles.icon} />
      </Button>
    );
  }
}

export default CartBadgeButton;
