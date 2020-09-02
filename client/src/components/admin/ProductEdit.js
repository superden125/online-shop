import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveProduct } from "../../action/productAction";
import { REACT_APP_API_URL } from "../../config";

import { listCategory } from "../../action/categoryAction";
import { showNotify } from "../component/Notify";
import { isEmpty } from "validator";
import productApi from "../../api/productApi";

function ProductEdit(props) {
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, product, error } = productDetail;
  const productSave = useSelector((state) => state.productSave);
  const { loadingSave, successEdit, errorSave } = productSave;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [newImage, setNewImage] = useState("");

  const [pathPreView, setPathPreView] = useState("");
  const [errors, setErrors] = useState([]);

  const id = props.match.params.id;

  const setState = (product) => {
    setTitle(product.title);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
    setDesc(product.desc);
    setPathPreView(
      `${REACT_APP_API_URL}/product_images/${product._id}/${product.image}`
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const data = await productApi.get(id);
      setState(data);
    }
    fetchData();

    dispatch(listCategory());

    if (successEdit) {
      showNotify("Success!", "Product edited!", "info");
      fetchData();
    }

    return () => {};
  }, [successEdit]);

  const validation = () => {
    const error = [];

    if (isEmpty(title)) {
      error["title"] = "Title not empty!";
    }

    if (isEmpty(price.toString())) {
      error["price"] = "Price not empty!";
    }
    if (isEmpty(category)) {
      error["category"] = "Category not empty!";
    }
    if (isEmpty(desc)) {
      error["description"] = "Description not empty";
    }

    if (image === "") {
      error["image"] = "Image not empty";
    }

    if (
      error["title"] ||
      error["price"] ||
      error["category"] ||
      error["description"] ||
      error["image"]
    ) {
      setErrors(error);
      return false;
    }

    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = validation();
    if (isValid) {
      let formData = new FormData();
      formData.append("_id", id);
      formData.append("image", image);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("desc", desc);
      formData.append("category", category);
      formData.append("new_image", newImage);
      dispatch(saveProduct(formData, id));
    }
  };

  const onUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
      setPathPreView(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <div className="container">
        <button
          className="btn btn-info"
          onClick={() => {
            props.history.push("/admin/product");
          }}
        >
          Back to List
        </button>
        <hr></hr>
        <h3 className="text-center">Edit Product</h3>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>error</div>
        ) : (
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors["title"] && (
                <span className="alert-danger form-control">
                  {errors["title"]}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              {categories ? (
                <select
                  className="form-control"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category, i) => (
                    <option value={category.slug} key={i}>
                      {category.title}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors["price"] && (
                <span className="alert-danger form-control">
                  {errors["price"]}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                type="text"
                name="desc"
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                cols="10"
                rows="10"
              />
              {errors["description"] && (
                <span className="alert-danger form-control">
                  {errors["description"]}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                className="form-control"
                type="file"
                name="newImage"
                id="newImage"
                onChange={(e) => onUpload(e)}
              />
              {errors["image"] && (
                <span className="alert-danger form-control">
                  {errors["image"]}
                </span>
              )}
              <img
                src={pathPreView}
                width="200px"
                height="200px"
                alt={title}
              ></img>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
              <button type="reset" className="btn btn-secondary btn-block">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProductEdit;
