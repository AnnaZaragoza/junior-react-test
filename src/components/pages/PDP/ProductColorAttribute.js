import { Component, Fragment } from "react";

import styles from "./ProductColorAttribute.module.css";

class ProductColorAttribute extends Component {
  render() {
    // Check the type of attribute (NO SWATCH)
    const checkedTypes = this.props.attributes.filter(
      (a) => a.type === "swatch"
    );

    // Display the attributes (NO SWATCH)
    const attributes = checkedTypes.map(
      (a) =>
        (a = (
          <li className={styles.attribute} key={a.id}>
            <h3 className={styles.title} key={a.name}>
              {a.name.toUpperCase()}:
            </h3>
            <ul className={styles.list}>
              {a.items.map(
                (item) =>
                  (item = (
                    <li
                      className={styles.colors}
                      key={item.displayValue}
                      style={{
                        backgroundColor: `${item.displayValue}`,
                      }}
                    ></li>
                  ))
              )}
            </ul>
          </li>
        ))
    );

    return <Fragment>{attributes}</Fragment>;
  }
}

export default ProductColorAttribute;
