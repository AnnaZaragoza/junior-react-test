import { Component } from "react";

import PLP from "./PLP/PLP";
import UsersUsefullInfo from "../../UI/UsersUsefullInfo";

class ClothesPage extends Component {
  render() {
    const clothesItems = JSON.parse(localStorage.getItem("products")).filter(
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
