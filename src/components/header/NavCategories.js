import { Component } from "react";

import styles from "./NavCategories.module.css";

class NavCategories extends Component {
  render() {
    return (
      <nav className={styles.navigation}>
        <button className={styles["navigation-button"]}>ALL</button>
        <button className={styles["navigation-button"]}>CLOTHES</button>
        <button className={styles["navigation-button"]}>TECH</button>
      </nav>
    );
  }
}

export default NavCategories;
