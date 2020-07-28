import React, { Component } from "react";
import formatCurrency from "../util";

export default class Cart extends Component {
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
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="button-align">
                      {formatCurrency(item.price)} x {item.count}
                      <button onClick={() => this.props.removeFromCart(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div className="cart">
              <div className="total">
                <div className="amount">
                  Total Amount:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, b) => a + b.price * b.count, 0)
                  )}
                </div>
                <button className="button button-primary btn-amount">
                  Proceed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
