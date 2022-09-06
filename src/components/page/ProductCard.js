import { Component } from "react";

import styles from "./ProductCard.module.css";

class ProductCard extends Component {
  render() {
    return (
      <div className={styles.card}>
        <img className={styles.image}></img>
        <div className={styles.content}>
          <h4 className={styles.title}>Apollo Running Short</h4>
          <p className={styles.price}>$50.00</p>
        </div>
      </div>
    );
  }
}

export default ProductCard;
