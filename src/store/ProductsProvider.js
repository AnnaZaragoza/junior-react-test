import { Component } from "react";
import ProductsContext from "./products-context";

class ProductsProvider extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      isLoading: true,
      error: null,
    };

    this.fetchProductsDataHandler();
  }

  async fetchProductsDataHandler() {
    try {
      const response = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              query ProductsList {
                category {
                  name
                  products {
                    id
                    gallery
                    name
                    inStock
                    prices {
                      currency {
                        symbol
                        label
                      }
                      amount
                    }
                    category
                    description
                    brand
                    attributes {
                      id
                      name
                      type
                      items {
                        displayValue
                        id
                      }
                    }
                  }
                }
              }`,
        }),
      });

      if (!response.ok)
        throw new Error("Something went wrong! Failed to fetch the data.");

      const data = await response.json();

      const productsArray = data.data.category.products;

      const adaptedProductsArray = productsArray.map((pData) => {
        return {
          id: pData.id,
          images: pData.gallery,
          title: pData.name,
          prices: pData.prices,
          priceAmount: pData.prices[0].amount,
          category: pData.category,
          brand: pData.brand,
          description: pData.description,
          attributes: pData.attributes,
          inStock: pData.inStock,
        };
      });
      console.log(adaptedProductsArray);

      // Save the data in local storage
      localStorage.setItem("products", JSON.stringify(adaptedProductsArray));

      this.setState({
        products: adaptedProductsArray,
      });
    } catch (error) {
      this.setState({
        error: `Something went wrong: ${error.message}`,
      });
    }
    this.setState({ isLoading: false });
  }

  render() {
    const productsContext = {
      products: this.state.products,
      isLoading: this.state.isLoading,
      error: this.state.error,
    };

    return (
      <ProductsContext.Provider value={productsContext}>
        {this.props.children}
      </ProductsContext.Provider>
    );
  }
}

export default ProductsProvider;
