import { Component } from 'react';
import ProductContext from '../store/product-context';

import styles from './ImageSlider.module.css';
// import { v4 as uuidv4 } from "uuid";

class ImageSlider extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      currentIndex: 0,
    };
  }

  goToPrevious() {
    const isFirstSlide = this.state.currentIndex === 0;
    const newIndex = this.props.slides[0].images.length - 1;

    if (isFirstSlide) {
      this.setState({ currentIndex: newIndex });
      return;
    }

    this.setState((prevState) => {
      return { currentIndex: prevState.currentIndex - 1 };
    });
  }

  goToNext() {
    const isLastSlide = this.state.currentIndex === this.props.slides[0].images.length - 1;

    if (isLastSlide) {
      this.setState({ currentIndex: 0 });
      return;
    }

    this.setState((prevState) => {
      return { currentIndex: prevState.currentIndex + 1 };
    });
  }

  render() {
    const imagesList = this.props.slides.map(
      (slide) =>
        (slide = (
          <img
            // key={uuidv4()}
            key={slide.id}
            className={styles.image}
            alt={slide.id}
            src={slide.images.at(this.state.currentIndex)}
          />
        ))
    );

    return (
      <div className={styles.container}>
        <div className={styles.arrows}>
          <button className={styles['arrow-left']} onClick={this.goToPrevious.bind(this)}>
            &lt;
          </button>
          <button className={styles['arrow-right']} onClick={this.goToNext.bind(this)}>
            &gt;
          </button>
        </div>
        {imagesList}
      </div>
    );
  }
}

export default ImageSlider;
