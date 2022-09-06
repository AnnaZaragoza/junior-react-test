import { Component } from "react";
import ProductCard from "./ProductCard";

import styles from "./PLP.module.css";

class PLP extends Component {
  render() {
    return (
      <section className={styles.list}>
        <ProductCard />
      </section>
    );
  }
}

export default PLP;
