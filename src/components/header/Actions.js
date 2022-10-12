import { Component } from "react";
import { withRouter } from "react-router-dom";

import HeaderCartButton from "../../UI/HeaderCartButton";
import ProductsContext from "../../store/products-context";

import styles from "./Actions.module.css";
import arrow from "../../icons/arrowCurrency.svg";

class Actions extends Component {
  static contextType = ProductsContext;

  constructor(props) {
    super(props);
    this.state = {
      currencyListIsShown: false,
      currencySymbol: "$",
    };
  }

  showCurrencyListHandler() {
    this.setState({ currencyListIsShown: true });
  }

  hideCurrencyListAndAddCurrrencyHandler(e) {
    // // Check the clicked symbol
    const symbolTargeted = e.target.innerHTML;
    let symbol = symbolTargeted.split(" ")[0];

    // Set up state
    this.setState({ currencyListIsShown: false, currencySymbol: symbol });

    // Forward new symbol to App
    this.props.onGetCurrencySymbol(symbol);
  }

  render() {
    // Extract Currencies Symbols and Labels from ProductsContext:
    const symbolsArray = this.context.products.map((p) =>
      p.prices
        .map((price) => price.currency)
        .map((c) => `${c.symbol} ${c.label}`)
    );
    let symbols = [].concat(...symbolsArray);
    const onlyUniqueValues = symbols.filter((v, i, s) => s.indexOf(v) === i);

    // Create a List of currencies available in each product:
    const currencyListSymbols = onlyUniqueValues.map(
      (v) =>
        (v = (
          <button
            key={v}
            className={styles["currencies-list-item"]}
            onClick={this.hideCurrencyListAndAddCurrrencyHandler.bind(this)}
          >
            {v}
          </button>
        ))
    );

    return (
      <nav className={styles.actions} data={this.state}>
        <button
          className={styles["currency-container"]}
          onClick={this.showCurrencyListHandler.bind(this)}
        >
          <span className={styles.currency}>{this.state.currencySymbol}</span>
          <img className={styles.arrow} src={arrow} alt="arrow"></img>
        </button>

        {this.state.currencyListIsShown && (
          <div className={styles["currencies-list"]}>{currencyListSymbols}</div>
        )}

        <HeaderCartButton onClick={this.props.onClick} />
      </nav>
    );
  }
}

export default withRouter(Actions);
