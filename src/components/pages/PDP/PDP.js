import { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Markup } from 'interweave';

import SmallImages from './SmallImages';
import ProductAttributes from './ProductAttributes';
import ProductColorAttribute from './ProductColorAttribute';
import Button from '../../../UI/Button';
import UsersUsefullInfo from '../../../UI/UsersUsefullInfo';

import styles from './PDP.module.css';
import ProductContext from '../../../store/product-context';

class PDP extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      brand: '',
      attributes: [],
      priceCurrencySymbol: '',
      description: '',
      images: [],
      prices: [],
      //////////////////////////////
      price: 0,
    };
  }

  componentDidMount() {
    // Get the products from LS
    const items = JSON.parse(localStorage.getItem('products'));
    const item = items.find((p) => p.id === this.props.match.params.productId);

    if (!item) return;

    this.setState({
      id: item.id,
      title: item.title,
      brand: item.brand,
      attributes: item.attributes,
      priceCurrencySymbol: this.props.currency,
      description: item.description,
      images: item.images,
      prices: item.prices,
      ///////////////////////////
      price: item.prices.find((price) => price.currency.symbol === this.props.currency).amount,
    });
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.currency);
    if (prevProps.currency !== this.props.currency) {
      this.setState({
        price: this.state.prices.find((price) => price.currency.symbol === this.props.currency).amount,
      });
    }
  }

  addToCartHandler(e) {
    e.stopPropagation();
    this.context.addCartItem({
      id: this.state.id,
      item: this.state.title,
      image: this.state.images[0],
      images: this.state.images,
      brand: this.state.brand,
      description: this.state.description,
      attributes: this.state.attributes,
      category: this.state.category,
      prices: this.state.prices,
      //////////////////////////////////////////////
      amount: 1,
      price: this.state.price,
    });
  }

  render() {
    const imagesList = this.state.images.map((image) => (image = <SmallImages key={image} image={image} />));

    return (
      <Fragment>
        {!this.state.id && <UsersUsefullInfo>No product found.</UsersUsefullInfo>}

        {this.state.id && (
          <div className={styles.item}>
            <div className={styles.images}>
              <ul className={styles['small-images']}>{imagesList}</ul>
              <img className={styles.image} alt={this.state.title} src={this.state.images[0]}></img>
            </div>

            <div className={styles.description}>
              <h3 className={styles.title}>{this.state.title}</h3>
              <h4 className={styles['title-description']}>{this.state.brand}</h4>
              <ul className={styles.attributes}>
                <ProductAttributes attributes={this.state.attributes} />
                <ProductColorAttribute attributes={this.state.attributes} />
              </ul>
              <h3 className={styles.price}>PRICE:</h3>
              <p className={styles.amount}>{`${this.props.currency} ${this.state.price}`}</p>
              <Button className={styles.button} onClick={this.addToCartHandler.bind(this)}>
                ADD TO CART
              </Button>
              <Markup className={styles['small-description']} content={this.state.description} />
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default withRouter(PDP);
