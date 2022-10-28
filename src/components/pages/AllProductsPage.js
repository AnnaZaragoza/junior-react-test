import { Component, Fragment } from "react";

import ProductsContext from "../../store/products-context";
import PLP from "./PLP/PLP";
import Error from "../../UI/Error";
import UsersUsefullInfo from "../../UI/UsersUsefullInfo";

class AllProductsPage extends Component {
  static contextType = ProductsContext;

  render() {
    return (
      <Fragment>
        {!this.context.isLoading && this.context.error && (
          <Error>{this.context.error}</Error>
        )}
        {!this.context.isLoading && this.context.products.length > 0 && (
          <PLP
            products={this.context.products}
            currency={this.props.currency}
          />
        )}
        {!this.context.isLoading && this.context.products.length === 0 && (
          <UsersUsefullInfo>No products found.</UsersUsefullInfo>
        )}
        {this.context.isLoading && (
          <UsersUsefullInfo>Loading...</UsersUsefullInfo>
        )}
      </Fragment>
    );
  }
}

export default AllProductsPage;
