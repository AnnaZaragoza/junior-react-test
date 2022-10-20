import { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import styles from "./ProductAttributes.module.css";

class ProductAttributes extends Component {
  constructor() {
    super();
    this.state = {
      attributes: [],
    };
  }

  componentDidMount() {
    let array = [];
    let itemArray = [];

    this.props.attributes.map((item, index) => {
      if (item.type === "swatch") {
        array.push(null);
        return;
      }

      array.push({
        id: item.id,
        name: item.name,
        type: item.type,
      });

      item.items.forEach((element) => {
        itemArray.push({
          isChecked: false,
          displayValue: element.displayValue,
          id: element.id,
        });

        array[index].items = itemArray;
      });
    });

    this.setState({
      attributes: array,
    });
  }

  changeBackgroundColorHandler(attributeIndex, itemIndex) {
    let array = [...this.state.attributes];

    array[attributeIndex].items.forEach((item, index) => {
      if (index != itemIndex) {
        item.isChecked = false;
      }
    });

    array[attributeIndex].items[itemIndex].isChecked = true;

    this.setState({ attributes: array });
  }

  render() {
    // Attributes to be displayed (NO SWATCH)
    const attributes = this.state.attributes.map(
      (a, attributeIndex) =>
        a && (
          <li
            className={`${this.props.className} ${styles.attribute} `}
            key={a.id}
          >
            <h3 className={styles.title}>{a.name.toUpperCase()}:</h3>
            <ul className={styles.list}>
              {a.items.map(
                (item, itemIndex) =>
                  (item = (
                    <li key={item.id}>
                      <button
                        className={`${styles.button} ${
                          item.isChecked ? `${styles.clicked}` : ""
                        }`}
                        onClick={() =>
                          this.changeBackgroundColorHandler(
                            attributeIndex,
                            itemIndex
                          )
                        }
                      >
                        {item.displayValue}
                      </button>
                    </li>
                  ))
              )}
            </ul>
          </li>
        )
    );

    return <Fragment>{attributes}</Fragment>;
  }
}

export default withRouter(ProductAttributes);
