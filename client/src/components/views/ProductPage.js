import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailProduct } from "../../action/productAction";
import { REACT_APP_API_URL, formatMoney } from "../../config";
import { addToCart } from "../../action/cartAction";
import { showNotify } from "../component/Notify";

function ProductPage(props) {
  const [qty, setQty] = useState(1);
  const [flash, setFlash] = useState(false);

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, product } = productDetail;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const id = props.match.params.id;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailProduct(id));
    return () => {};
  }, []);

  useEffect(() => {
    if (flash) {
      showNotify("Success", "Product added!", "success");
      setFlash(false);
    }
  }, [flash]);

  const handleSubQty = () => {
    setQty(qty - 1);
  };

  const handleAddQty = () => {
    setQty(qty + 1);
  };

  const handleAddToCart = () => {
    if (userInfo) {
      dispatch(addToCart(product._id, qty));
      setFlash(true);
    } else {
      props.history.push(`/login?redirect=${props.location.pathname.slice(1)}`);
    }
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product._id, qty));
    props.history.push("/cart");
  };

  return product ? (
    <div className="container product-detail">
      <div className="row">
        <div className="col-md-7 offset-1">
          <img
            src={`${REACT_APP_API_URL}/product_images/${product._id}/${product.image}`}
            alt="product"
          />
        </div>
        <div className="col-md-4">
          <h3>{product.title}</h3>
          <h4 className="text-danger mt-3 mb-5">
            {formatMoney(product.price)}
          </h4>
          <div className="pb-5">
            Qty:
            <button
              className="btn btn-outline-info ml-3 mr-3"
              onClick={() => handleSubQty()}
              disabled={qty === 1}
            >
              -
            </button>
            <span>{qty}</span>
            <button
              className="btn btn-outline-info ml-3"
              onClick={() => handleAddQty()}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-primary mr-2"
            style={{ width: "150px" }}
            onClick={() => handleAddToCart()}
          >
            Add to cart
          </button>
          <button
            className="btn btn-info"
            style={{ width: "150px" }}
            onClick={() => handleBuyNow()}
          >
            Buy Now
          </button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <h3>Description</h3>
          <p>{product.desc}</p>
        </div>
      </div>
    </div>
  ) : (
    <div>Product not found</div>
  );
}

export default ProductPage;
