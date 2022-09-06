import React from "react";
import { Component } from "react";

import Header from "./components/header/Header";
import MainPage from "./components/page/MainPage";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <MainPage />
      </React.Fragment>
    );
  }
}

export default App;
