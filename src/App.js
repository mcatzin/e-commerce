import React from "react";
import data from "./data.json";
import Product from "./components/Product";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }

  createOrder = (order) => {
    alert("need to handle this order" + order.name);
  };
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((item) => item.id !== product.id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((item) => item.id !== product.id))
    );
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let isAlreadyInCart = false;
    cartItems.forEach((item) => {
      if (item.id === product.id) {
        item.count++;
        isAlreadyInCart = true;
      }
    });

    if (!isAlreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState((prevState) => ({
      sort: sort,
      products: prevState.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a.id > b.id
            ? 1
            : -1
        ),
    }));
  };

  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/"> React E - Commerce </a>{" "}
        </header>{" "}
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                sort={this.state.sort}
                size={this.state.size}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Product
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved </footer>{" "}
      </div>
    );
  }
}

export default App;
