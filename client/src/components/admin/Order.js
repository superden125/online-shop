import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderList, orderChangeStatus } from "../../action/orderAction";
import { formatMoney } from "../../config";
import { showNotify } from "../component/Notify";
import PaginationCus from "../component/PaginationCus";
import ModalOrder from "../component/ModalOrder";

function Order(props) {
  const orders = useSelector((state) => state.order);
  const { order, errorOrder, changeState } = orders;

  const [show, setShow] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    totalRow: 1,
  });
  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
  });
  const [modalShow, setModalShow] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderList(filters));
    if (changeState && show) {
      showNotify("Changed", " ", "info");
      setShow(false);
    }
  }, [changeState, errorOrder, filters]);

  const formatState = [
    "Waiting Process",
    "Shipping",
    "Return",
    "Fail",
    "Finished",
  ];

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  const formatDate = (ISODate) => {
    const d = new Date(ISODate);
    return (
      ("0" + d.getDate()).slice(-2) +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      d.getFullYear() +
      " " +
      ("0" + d.getHours()).slice(-2) +
      ":" +
      ("0" + d.getMinutes()).slice(-2)
    );
  };

  const totalOrder = (cart) => {
    return formatMoney(cart.reduce((a, c) => a + c.price * c.qty, 0));
  };

  const preventEvent = (e) => {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  };

  const handleChangeState = (e, idOrder, nextState) => {
    preventEvent(e);

    dispatch(orderChangeStatus(idOrder, nextState));
    setShow(true);
  };

  const handleShowModal = (item) => {
    setModalShow(true);
    setModalItem(item);
  };

  const handleHideModal = () => {
    setModalShow(false);
    setModalItem({});
  };

  return order.results ? (
    <div className="container-fluid">
      {errorOrder ? (
        <h3>{errorOrder}</h3>
      ) : (
        <div>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Id Order</th>
                <th>Date Order</th>
                <th>Total</th>
                <th>State</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {order.results.map((item) => (
                <tr key={item._id} onClick={() => handleShowModal(item)}>
                  <td>{item._id}</td>
                  <td>{formatDate(item.timestamp)}</td>
                  <td>{totalOrder(item.cart)}</td>
                  <td>{formatState[item.status]}</td>

                  <td>
                    {item.status === 0 && (
                      <button
                        className="btn btn-success mr-3"
                        onClick={(e) => handleChangeState(e, item._id, 1)}
                      >
                        Ready to shipping
                      </button>
                    )}
                    {item.status === 0 && (
                      <button
                        className="btn btn-warning"
                        onClick={(e) => handleChangeState(e, item._id, 3)}
                      >
                        Cancel
                      </button>
                    )}
                    {item.status === 1 && (
                      <button
                        className="btn btn-success mr-3"
                        onClick={(e) => handleChangeState(e, item._id, 4)}
                      >
                        Finish
                      </button>
                    )}
                    {item.status === 1 && (
                      <button
                        className="btn btn-warning"
                        onClick={(e) => handleChangeState(e, item._id, 2)}
                      >
                        Return
                      </button>
                    )}
                    {item.status === 2 ||
                      (item.status === 3 && (
                        <button className="btn btn-info">Check</button>
                      ))}
                    {/* {item.status === 4 && (
                    <button className="btn btn-info">View Detail</button>
                  )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ModalOrder
            show={modalShow}
            order={modalItem}
            onHide={() => handleHideModal()}
            formatDate={formatDate}
          />
          <PaginationCus
            pagination={order.pagination ? order.pagination : pagination}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  ) : (
    <h3>Order Empty</h3>
  );
}

export default Order;
