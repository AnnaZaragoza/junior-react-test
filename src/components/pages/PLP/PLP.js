import { Component, Fragment } from "react";

import ProductCard from "./ProductCard";

import styles from "./PLP.module.css";

class PLP extends Component {
  constructor() {
    super();
    this.state = {
      priceAmounts: [],
      priceAmount: "",
    };
  }

  // componentDidMount() {
  //   const defaultPriceAmounts = this.props.products.map((p) => p.priceAmount);

  //   this.setState({ priceAmounts: defaultPriceAmounts });
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      // Extract amounts and currency symbols
      const priceAmounts = this.props.products.map((item) =>
        item.prices.map((p) => p.amount)
      );
      const priceSymbols = this.props.products.map((item) =>
        item.prices.map((p) => p.currency).map((c) => c.symbol)
      );

      // Find the index of the current symbol (from app (actions))
      const indexCurrentSymbol = priceSymbols
        .map((symbols) => symbols.indexOf(this.props.currency))
        .find((v) => v !== -1);

      // Find the proper amounts
      const correspondedAmounts = priceAmounts.map(
        (a) => a[indexCurrentSymbol]
      );
      this.setState({ priceAmounts: correspondedAmounts });
    }
  }

  getPriceAmountHandler(amount) {
    console.log(amount);
    this.setState({ priceAmount: amount });
  }

  render() {
    const productsList = this.props.products.map(
      (product) =>
        (product = (
          <ProductCard
            key={product.id}
            id={product.id}
            category={product.category}
            image={product.images[0]}
            title={product.title}
            priceCurrencySymbol={this.props.currency}
            priceAmount={product.priceAmount}
            prices={product.prices}
            brand={product.brand}
            description={product.description}
            attributes={product.attributes}
            images={product.images}
            inStock={product.inStock}
          />
        ))
    );

    const pageTitle =
      this.props.products[0].category.charAt(0).toUpperCase() +
      this.props.products[0].category.slice(1);

    const pageTitleChecked = this.props.products.every(
      (product) => product.category === this.props.products[0].category
    );

    return (
      <Fragment>
        <h2 className={styles.title}>{pageTitleChecked ? pageTitle : "All"}</h2>
        <ul className={styles.list}>{productsList}</ul>
      </Fragment>
    );
  }
}

export default PLP;
