import { Component } from "react";

import styles from "./Actions.module.css";
import arrow from "../../icons/arrowCurrency.svg";
import cart from "../../icons/cartIcon.svg";

class Actions extends Component {
  render() {
    return (
      <nav className={styles.actions}>
        <button className={styles["currency-container"]}>
          <div className={styles.currency}>$</div>
          <img className={styles.arrow} src={arrow} alt="arrow"></img>
        </button>

        <div className={styles["currencies-list"]}>
          <a className={styles["currencies-list-item"]}>$ USD</a>
          <a className={styles["currencies-list-item"]}>E Euro</a>
        </div>

        <button className={styles["shopping-cart"]}>
          <img className={styles.cart} src={cart} alt="cart"></img>
        </button>
      </nav>
    );
  }
}

export default Actions;
