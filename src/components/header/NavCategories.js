import { Component } from "react";

import styles from "./NavCategories.module.css";

class NavCategories extends Component {
  render() {
    return (
      <nav className={styles.navigation}>
        <div className={styles["navigation-buttons"]}>
          <button className={styles["navigation-button"]}>ALL</button>
        </div>
        <div className={styles["navigation-buttons"]}>
          <button className={styles["navigation-button"]}>CLOTHES</button>
        </div>
        <div className={styles["navigation-buttons"]}>
          <button className={styles["navigation-button"]}>TECH</button>
        </div>
      </nav>
    );
  }
}

export default NavCategories;
