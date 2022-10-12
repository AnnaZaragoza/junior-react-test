import { Component } from "react";

import styles from "./NavButton.module.css";

class NavButton extends Component {
  render() {
    return (
      <button
        className={`${styles.button} ${this.props.className}`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default NavButton;
