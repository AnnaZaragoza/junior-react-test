import { Component } from "react";
import storePLP from "../../store/storePLP";

import styles from "./ProductCard.module.css";

class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      name: storePLP.name,
    };
  }

  productStateHandler() {
    this.setState(this.state);
  }

  render() {
    return (
      <div className={styles.card}>
        <img className={styles.image}>{this.state.name}</img>
        <div className={styles.content}>
          <h4 className={styles.title}>Apollo Running Short</h4>
          <p className={styles.price}>$50.00</p>
        </div>
      </div>
    );
  }
}

export default ProductCard;
