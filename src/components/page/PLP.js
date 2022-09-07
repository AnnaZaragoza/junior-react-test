import { Component } from "react";
import ProductCard from "./ProductCard";

import styles from "./PLP.module.css";

class PLP extends Component {
  constructor() {
    super();
    this.products = [1, 2, 3, 4, 5, 6]; // === storePLP.products.length
  }

  render() {
    return (
      <section className={styles.list}>
        {this.products.map((el) => (el = <ProductCard />))}
      </section>
    );
  }
}

export default PLP;
