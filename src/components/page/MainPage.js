import { Component } from "react";
import PLP from "./PLP";

import styles from "./MainPage.module.css";

class MainPage extends Component {
  render() {
    return (
      <main className={styles.main}>
        <h2 className={styles.title}>Category name</h2>
        <PLP />
      </main>
    );
  }
}

export default MainPage;
