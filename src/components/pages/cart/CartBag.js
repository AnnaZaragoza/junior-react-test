import { Component } from "react";

import CartProductCard from "./CartProductCard";
import ProductContext from "../../../store/product-context";
import Button from "../../../UI/Button";

import styles from "./CartBag.module.css";

class CartBag extends Component {
  static contextType = ProductContext;

  render() {
    const cartItemsList = this.context.cartItems.map(
      (product) =>
        (product = (
          <CartProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.item}
            priceCurrencySymbol={this.props.currency}
            priceAmount={product.price}
            brand={product.brand}
            attributes={product.attributes}
          />
        ))
    );

    return (
      <section className={styles.container}>
        <h2 className={styles.title}>CART</h2>
        <ul className={styles.list}>{cartItemsList}</ul>
        <hr />
        <div className={styles.summary}>
          <table>
            <tbody>
              <tr>
                <td>Tax 21%</td>
                <td style={{ color: "lightgray" }}>$42.00</td>
              </tr>
              <tr>
                <td>Quantity:</td>
                <td style={{ color: "lightgray" }}>3</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td style={{ color: "lightgray" }}>$42.00</td>
              </tr>
            </tbody>
          </table>
          <Button className={styles.button}>ORDER</Button>
        </div>
      </section>
    );
  }
}

export default CartBag;
