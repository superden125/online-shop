import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";

import { REACT_APP_API_URL } from "../../config";
import PaginationCus from "../component/PaginationCus";
import "../layouts/Sidebar.css";
import { listProduct, deleteProduct } from "../../action/productAction";

import { showNotify } from "../component/Notify";

function ProductManage(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, result } = productList;
  const productSave = useSelector((state) => state.productSave);
  const { successSave } = productSave;
  const productDelete = useSelector((state) => state.productDelete);
  const { successDelete, errorDelete } = productDelete;

  const [show, setShow] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    totalRow: 1,
  });
  const [filters, setFilters] = useState({
    limit: 5,
    page: 1,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProduct(filters));
    return () => {};
  }, [successSave, filters]);

  useEffect(() => {
    if (show) {
      showNotify("Deleted!", "Product delete!", "danger");
      setShow(false);
    }
  }, [successDelete]);

  const onEditProduct = (id) => {
    props.history.push("/admin/product/edit/" + id);
  };

  const onDelete = (e, id) => {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var confirm = window.confirm("Do you want delete this product!");
    if (!confirm) {
      return;
    } else {
      dispatch(deleteProduct(id));
      setShow(true);
    }
  };

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  return result.results ? (
    <div>
      <button
        className="btn btn-info mb-5 mt-5 ml-5"
        onClick={() => {
          props.history.push("/admin/product/add");
        }}
      >
        Add New Product
      </button>

      <table className="table table-hover ml-5 mr-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {result.results.map((product) => (
            <tr key={product._id} onClick={() => onEditProduct(product._id)}>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>
                <img
                  src={`${REACT_APP_API_URL}/product_images/${product._id}/${product.image}`}
                  width="100px"
                  height="100px"
                  alt={product.title}
                ></img>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    onDelete(e, product._id);
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationCus
        pagination={result.pagination ? result.pagination : pagination}
        onPageChange={handlePageChange}
      />
    </div>
  ) : (
    <h1>There are no product</h1>
  );
}

export default ProductManage;
