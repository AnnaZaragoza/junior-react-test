import { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import styles from "./ProductAttributes.module.css";

class ProductAttributes extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: true,
    };
  }

  changeBackgroundColorHandler() {
    this.setState({ isClicked: false });
  }

  render() {
    // Check the type of attribute (NO SWATCH)
    const checkedTypes = this.props.attributes.filter(
      (a) => a.type !== "swatch"
    );

    // Attributes to be displayed (NO SWATCH)
    const attributes = checkedTypes.map(
      (a) =>
        (a = (
          <li
            className={`${this.props.className} ${styles.attribute} `}
            key={a.id}
          >
            <h3 className={styles.title}>{a.name.toUpperCase()}:</h3>
            <ul className={styles.list}>
              {a.items.map(
                (item) =>
                  (item = (
                    <li key={item.id}>
                      <button
                        className={`${styles.button} ${
                          !this.state.isClicked ? `${styles.clicked}` : ""
                        }`}
                        onClick={this.changeBackgroundColorHandler.bind(this)}
                      >
                        {item.displayValue}
                      </button>
                    </li>
                  ))
              )}
            </ul>
          </li>
        ))
    );

    return <Fragment>{attributes}</Fragment>;
  }
}

export default withRouter(ProductAttributes);
