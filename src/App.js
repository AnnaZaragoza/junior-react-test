import React from "react";
import { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ProductProvider from "./store/ProductProvider";
import ProductsContext from "./store/products-context";
import ProductsProvider from "./store/ProductsProvider";
import Header from "./components/header/Header";
import AllProductsPage from "./components/pages/AllProductsPage";
import ClothesPage from "./components/pages/ClothesPage";
import TechPage from "./components/pages/TechPage";
import CartBag from "./components/pages/cart/CartBag";
import PDP from "./components/pages/PDP/PDP";
import CartOverlay from "./components/pages/cart/CartOverlay";
import UsersUsefullInfo from "./UI/UsersUsefullInfo";

import styles from "./App.module.css";

class App extends Component {
  static contextType = ProductsContext;

  constructor(props) {
    super(props);
    this.state = {
      cartIsShown: false,
      currencySymbol: "$",
    };
  }

  showCartHandler() {
    this.setState({ cartIsShown: true });
  }

  hideCartHandler() {
    this.setState({ cartIsShown: false });
  }

  addCurrencySymbolHandler(symbol) {
    this.setState({ currencySymbol: symbol });
  }

  render() {
    return (
      <ProductsProvider>
        <ProductProvider>
          <Header
            onShowCart={this.showCartHandler.bind(this)}
            onAddCurrencySymbol={this.addCurrencySymbolHandler.bind(this)}
          />
          {this.state.cartIsShown && (
            <CartOverlay
              onClose={this.hideCartHandler.bind(this)}
              currency={this.state.currencySymbol}
            />
          )}

          <main className={styles.main}>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/products" />
              </Route>
              <Route path="/products" exact>
                <AllProductsPage currency={this.state.currencySymbol} />
              </Route>
              <Route path="/products/clothes">
                <ClothesPage currency={this.state.currencySymbol} />
              </Route>
              <Route path="/products/tech">
                <TechPage currency={this.state.currencySymbol} />
              </Route>
              <Route path="/products/cart-bag">
                <CartBag currency={this.state.currencySymbol} />
              </Route>
              <Route path="/products/:productId">
                <PDP currency={this.state.currencySymbol} />
              </Route>
              <Route path="*">
                <UsersUsefullInfo>Page no found</UsersUsefullInfo>
              </Route>
            </Switch>
          </main>
        </ProductProvider>
      </ProductsProvider>
    );
  }
}

export default App;
