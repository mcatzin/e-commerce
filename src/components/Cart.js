import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { removeFromCart } from "../actions/cartActions";
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      address: "",
      email: "",
      isCheckOut: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  createOrder = (event) => {
    event.preventDefault();

    const order = {
      name: this.state.name,
      address: this.state.address,
      email: this.state.email,
      cartItems: this.props.cartItems,
    };

    this.props.createOrder(order);
  };
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-container">Cart is empty</div>
        ) : (
          <div className="cart cart-container">
            You have {cartItems.length} in the cart.
          </div>
        )}
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="button-align">
                        {formatCurrency(item.price)} x {item.count}
                        <button
                          className="button"
                          onClick={() => this.props.removeFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div className="amount">
                    Total Amount:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, b) => a + b.price * b.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ isCheckOut: true });
                    }}
                    className="button button-primary btn-amount"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.isCheckOut && (
                <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            onChange={this.handleChange}
                          ></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            onChange={this.handleChange}
                          ></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            type="text"
                            name="address"
                            required
                            onChange={this.handleChange}
                          ></input>
                        </li>
                        <li>
                          <button
                            className="button button-primary"
                            type="submit"
                          >
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart }
)(Cart);
