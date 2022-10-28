import { Component } from 'react';

import CartProductCard from './CartProductCard';
import ProductContext from '../../../store/product-context';
import Button from '../../../UI/Button';

import styles from './CartBag.module.css';

class CartBag extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      totalAmount: 0,
    };
  }

  componentDidMount() {
    this.setState({
      totalAmount: JSON.parse(localStorage.getItem('cartTotalAmount')),
    });
  }

  changeTotalAmountHandler(price) {
    const updatedCartTotalAmount = Number(this.state.totalAmount) + Number(price);

    this.setState({
      totalAmount: updatedCartTotalAmount,
    });

    // Save changed total amount in LS
    localStorage.setItem('cartTotalAmount', JSON.stringify(updatedCartTotalAmount));
  }

  render() {
    const cartItemsList = this.context.cartItems.map(
      (product) =>
        (product = (
          <CartProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.item}
            brand={product.brand}
            attributes={product.attributes}
            ///////////////////////////////////////////
            priceCurrencySymbol={this.props.currency}
            prices={product.prices}
            onGetNewProductPrice={this.changeTotalAmountHandler.bind(this)}
            ///////////////////////////////////////////
            price={product.price}
            amount={product.amount}
          />
        ))
    );

    const savedTotalAmount = JSON.parse(localStorage.getItem('cartTotalAmount'));

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
                <td style={{ color: 'lightgray' }}>$42.00</td>
              </tr>
              <tr>
                <td>Quantity:</td>
                <td style={{ color: 'lightgray' }}>3</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td style={{ color: 'lightgray' }}>
                  {this.props.currency}
                  {savedTotalAmount}
                </td>
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
