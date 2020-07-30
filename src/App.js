import React from "react";

import Product from "./components/Product";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">Shilo's Toys </a>{" "}
          </header>{" "}
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Product />
              </div>
              <div className="sidebar">
                <Cart />
              </div>
            </div>
          </main>
          <footer>All right is reserved </footer>{" "}
        </div>
      </Provider>
    );
  }
}

export default App;
