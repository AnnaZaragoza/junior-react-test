import { Component } from "react";

import styles from "./SmallImages.module.css";

class SmallImages extends Component {
  render() {
    return (
      <li>
        <img
          src={this.props.image}
          alt={"Picture Product"}
          className={styles.image}
        />
      </li>
    );
  }
}

export default SmallImages;
