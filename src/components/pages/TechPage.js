import { Component } from "react";

import PLP from "./PLP/PLP";
import UsersUsefullInfo from "../../UI/UsersUsefullInfo";
import ProductsContext from "../../store/products-context";

class TechPage extends Component {
  static contextType = ProductsContext;

  render() {
    const techItems = this.context.products.filter(
      (i) => i.category === "tech"
    );

    if (techItems.length === 0) {
      return <UsersUsefullInfo>No Clothes found</UsersUsefullInfo>;
    } else {
      return <PLP products={techItems} currency={this.props.currency} />;
    }
  }
}

export default TechPage;
