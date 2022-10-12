import { Component } from "react";
import styles from "./ButtonSecondary.module.css";

class ButtonSecondary extends Component {
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

export default ButtonSecondary;
