import { Component } from "react";

import PLP from "./PLP/PLP";
import UsersUsefullInfo from "../../UI/UsersUsefullInfo";
import ProductsContext from "../../store/products-context";

class ClothesPage extends Component {
  static contextType = ProductsContext;

  render() {
    const clothesItems = this.context.products.filter(
      (i) => i.category === "clothes"
    );

    if (clothesItems.length === 0) {
      return <UsersUsefullInfo>No Clothes found</UsersUsefullInfo>;
    } else {
      return <PLP products={clothesItems} currency={this.props.currency} />;
    }
  }
}

export default ClothesPage;
