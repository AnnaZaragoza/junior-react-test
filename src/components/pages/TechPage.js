import { Component } from "react";

import PLP from "./PLP/PLP";
import UsersUsefullInfo from "../../UI/UsersUsefullInfo";

class TechPage extends Component {
  render() {
    const techItems = JSON.parse(localStorage.getItem("products")).filter(
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
