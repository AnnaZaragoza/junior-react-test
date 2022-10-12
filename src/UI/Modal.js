import { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

class Backdrop extends Component {
  render() {
    return <div className={styles.backdrop} onClick={this.props.onClose}></div>;
  }
}

class Overlay extends Component {
  render() {
    return <div className={styles.overlay}>{this.props.children}</div>;
  }
}

class Modal extends Component {
  render() {
    const portal = document.getElementById("overlays");

    return (
      <Fragment>
        {ReactDOM.createPortal(
          <Backdrop onClose={this.props.onClose} />,
          portal
        )}
        {ReactDOM.createPortal(
          <Overlay>{this.props.children}</Overlay>,
          portal
        )}
      </Fragment>
    );
  }
}

export default Modal;
