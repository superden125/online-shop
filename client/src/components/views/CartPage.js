import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REACT_APP_API_URL, formatMoney } from "../../config";
import {
  addToCart,
  removeFromCart,
  removeAllItem,
} from "../../action/cartAction";
import ShippingPage from "./ShippingPage";
import { orderAddCart } from "../../action/orderAction";

function CartPage(props) {
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const orders = useSelector((state) => state.order);
  const { order, errorOrder } = orders;

  const dispatch = useDispatch();
  const handleChangeQty = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  useEffect(() => {
    setSubtotal(cartItems.reduce((a, c) => a + c.price * c.qty, 0));
    setTotal(subtotal + shipping - discount);
  }, [cartItems, subtotal, shipping, discount, order]);

  useEffect(() => {
    console.log(errorOrder);
  }, [errorOrder]);

  const handleRemoveItem = (id) => {
    var confirm = window.confirm("Do you want remove this item!");
    if (!confirm) return;

    dispatch(removeFromCart(id));
  };

  const parseCart = (cartItems) => {
    const cart = [];
    cartItems.forEach((item) => {
      cart.push({
        id: item.product,
        title: item.title,
        price: item.price,
        qty: item.qty,
      });
    });
    return cart;
  };

  const handleSubmit = (address) => {
    const cart = parseCart(cartItems);
    const data = {
      address,
      cart,
    };

    dispatch(orderAddCart(data));
  };

  const handleRemoveAll = () => {
    var confirm = window.confirm("Do you want remove all item!");
    if (!confirm) return;
    dispatch(removeAllItem());
  };

  return cartItems.length > 0 ? (
    <div className="container-fluid min-vh-100 mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-1">
          <table className="table table-hover border">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product}>
                  <td>
                    <img
                      src={`${REACT_APP_API_URL}/product_images/${item.product}/${item.image}`}
                      alt="product"
                      className="img-item mr-3"
                    />
                    {item.title}
                  </td>

                  <td>
                    <button
                      className="btn btn-outline-info mr-3"
                      onClick={() =>
                        handleChangeQty(item.product, item.qty - 1)
                      }
                      disabled={item.qty === 1}
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      className="btn btn-outline-info ml-3"
                      onClick={() =>
                        handleChangeQty(item.product, item.qty + 1)
                      }
                    >
                      +
                    </button>
                  </td>
                  <td>{formatMoney(item.price)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(item.product)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-danger" onClick={() => handleRemoveAll()}>
            Remove All
          </button>
        </div>

        <div className="col-md-4">
          <div className="cart-info">
            <h4>Information Order</h4>
            <div>
              SubTotal:{" "}
              <span className="cart-price">{formatMoney(subtotal)}</span>
            </div>

            <div>
              Shipping:{" "}
              <span className="cart-price">{formatMoney(shipping)}</span>
            </div>

            <div>
              <input type="text" placeholder="Coupon" />
              <button type="button" className="btn btn-success">
                Apply
              </button>
            </div>
            <div>
              Discount:{" "}
              <span className="cart-price">{formatMoney(discount)}</span>
            </div>
            <div>
              Total: <span className="cart-price">{formatMoney(total)}</span>
            </div>
          </div>
          <ShippingPage onSubmitShipping={handleSubmit} />
        </div>
      </div>
    </div>
  ) : order.success ? (
    <div className="vh-100 content-center">
      <h2 className="text-center text-success">Order Success</h2>
      <button
        className="btn btn-lg btn-outline-primary d-center btn-block"
        onClick={() => props.history.push("/shop")}
      >
        Continue buy us product
      </button>
    </div>
  ) : (
    <div className="vh-100 content-center">
      <h2 className="text-center text-warning">Cart Empty</h2>
      <button
        className="btn btn-lg btn-outline-primary d-center btn-block"
        onClick={() => props.history.push("/shop")}
      >
        Continue buy us product
      </button>
    </div>
  );
}

export default CartPage;
