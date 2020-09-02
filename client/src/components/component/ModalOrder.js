import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import userApi from "../../api/userApi";
import { formatMoney } from "../../config";

function ModalOrder(props) {
  const { id_user, address, cart, _id, timestamp } = props.order;
  const { formatDate } = props;

  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = await userApi.getUser(id_user);
      if (!data.error) {
        setUser(data);
      }
    }
    if (id_user) fetchData();
  }, [id_user]);

  const handleHide = () => {
    props.onHide();
    setUser({});
  };

  const formatAddress = (address) => {
    return `${address.address}, ${address.ward.value}, ${address.district.value}, ${address.city.value}`;
  };

  const totalOrder = (cart) => {
    return formatMoney(cart.reduce((a, c) => a + c.price * c.qty, 0));
  };

  const handleOpenProduct = (id) => {
    window.open(`/shop/product/${id}`);
  };

  console.log(cart);
  return (
    <Modal
      {...props}
      //size="lg"
      dialogClassName="modal-90w"
      //   .my-modal {
      //     width: 90vw    /* Occupy the 90% of the screen width */
      //     max-width: 90vw;
      // }
      aria-labelledby="contained-modal-title-vcenter"
      //centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Detail Order {_id && _id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-1">
                <strong>Name</strong>
              </div>
              <div className="col-md-11">{user.name}</div>

              <div className="col-md-1">
                <strong>Email</strong>
              </div>
              <div className="col-md-11">{user.email}</div>

              <div className="col-md-1">
                <strong>Address</strong>
              </div>
              {address && (
                <div className="col-md-11">{formatAddress(address)}</div>
              )}

              <div className="col-md-1">
                <strong>Phone</strong>
              </div>
              {address && <div className="col-md-11">{address.phone}</div>}

              <div className="col-md-1">
                <strong>Date Order</strong>
              </div>
              {timestamp && (
                <div className="col-md-11">{formatDate(timestamp)}</div>
              )}

              <div className="col-md-12">
                <strong>Cart</strong>
              </div>
              {cart && (
                <div className="col-md-12">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <td>Product</td>
                        <td>Qty</td>
                        <td>Price</td>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => handleOpenProduct(item.id)}
                        >
                          <td>{item.title}</td>
                          <td>{item.qty}</td>
                          <td>{formatMoney(item.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="col-md-1">
                <strong>Total</strong>
              </div>
              {cart && <div className="col-md-11">{totalOrder(cart)}</div>}
            </div>
          </div>
        ) : (
          <p>Oder not found</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleHide()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalOrder.propTypes = {
  order: PropTypes.object.isRequired,

  onHide: PropTypes.func,
  formatDate: PropTypes.func,
};

ModalOrder.defaultProps = {
  order: {},
  onHide: null,
  formatDate: null,
};

export default ModalOrder;
