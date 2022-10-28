import { Component } from "react";
import styles from "./UsersUsefullInfo.module.css";

class UsersUsefullInfo extends Component {
  render() {
    return (
      <p className={`${styles.message} ${this.props.className}`}>
        {this.props.children}
      </p>
    );
  }
}

export default UsersUsefullInfo;
