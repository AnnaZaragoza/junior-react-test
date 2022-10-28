import { Component } from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavCategories.module.css";

class NavCategories extends Component {
  render() {
    return (
      <nav className={styles.navigation}>
        <NavLink
          to="/products"
          exact
          className={styles.button}
          activeClassName={styles.active}
        >
          ALL
        </NavLink>
        <NavLink
          to={`/products/clothes`}
          className={styles.button}
          activeClassName={styles.active}
        >
          CLOTHES
        </NavLink>
        <NavLink
          to={`/products/tech`}
          className={styles.button}
          activeClassName={styles.active}
        >
          TECH
        </NavLink>
      </nav>
    );
  }
}

export default NavCategories;
