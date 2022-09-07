import { Component } from "react";
import storePLP from "../../store/storePLP";

import styles from "./ProductCard.module.css";

class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      image: "first image from array",
      name: "storePLP.name",
      symbol: "storePLP.symbol",
      amount: "storePLP.amount",
    };
  }

  render() {
    return (
      <div className={styles.card}>
        <img className={styles.image} src={this.state.image}></img>
        <div className={styles.content}>
          <h4 className={styles.title}>{this.state.name}</h4>
          <p className={styles.price}>
            {this.state.symbol}
            {this.state.amount}
          </p>
        </div>
      </div>
    );
  }
}

export default ProductCard;
