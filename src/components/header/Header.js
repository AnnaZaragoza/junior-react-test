import { Component } from "react";
import NavCategories from "./NavCategories";
import Actions from "./Actions";

import styles from "./Header.module.css";
import logo from "../../icons/logo.svg";

class Header extends Component {
  getCurrencySymbolHandler(clickedSymbol) {
    this.props.onAddCurrencySymbol(clickedSymbol);
  }

  render() {
    return (
      <header className={styles["header-container"]}>
        <NavCategories />
        <img className={styles.logo} src={logo} alt="logo"></img>
        <Actions
          onClick={this.props.onShowCart}
          onGetCurrencySymbol={this.getCurrencySymbolHandler.bind(this)}
        />
      </header>
    );
  }
}

export default Header;
