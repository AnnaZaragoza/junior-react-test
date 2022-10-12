import { Component } from "react";
import styles from "./Error.module.css";

class Error extends Component {
  render() {
    return (
      <p className={`${styles.error} ${this.props.className}`}>
        {this.props.children}
      </p>
    );
  }
}

export default Error;
