import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { removeFromCart } from "../actions/cartActions";
import { connect } from "react-redux";
import { createOrder, clearOrder } from "../actions/orderActions";

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
      total: this.props.cartItems.reduce((a, b) => a + b.price * b.count, 0),
    };

    this.props.createOrder(order);
  };

  closeModal = () => {
    this.props.clearOrder();
  };
  render() {
    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-container">Cart is empty</div>
        ) : (
          <div className="cart cart-container">
            You have {cartItems.length} in the cart.
          </div>
        )}

        {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="order-details">
                <h3 className="success-message">Your order has been placed.</h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{formatCurrency(order.total)}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div>
                          {x.count} {" x "} {x.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
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
    order: state.order.order,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);
