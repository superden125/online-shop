import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, FastField } from "formik";
import { Form as Forms } from "react-bootstrap";
import * as Yup from "yup";

import { saveProduct } from "../../action/productAction";
import { listCategory } from "../../action/categoryAction";
import { showNotify } from "../component/Notify";

import InputField from "../../custom-field/InputField";
import SelectedCategoryField from "../../custom-field/SelectedCategoryField";
import TextAreaField from "../../custom-field/TextAreaField";
import UploadImageField from "../../custom-field/UploadImageField";
import productApi from "../../api/productApi";
import { REACT_APP_API_URL } from "../../config";

function ProductAdd(props) {
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [initValue, setInitValue] = useState({
    title: "",
    price: null,
    desc: "",
    category: "",
    image: null,
  });

  const id = props.match.params.id;

  const [isBusy, setIsBusy] = useState(id ? true : false);

  const productSave = useSelector((state) => state.productSave);
  const {
    loadingSave,
    successSave,
    errorSave,
    product,
    successEdit,
  } = productSave;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategory());
    async function fetchData() {
      if (id) {
        const data = await productApi.get(id);

        setInitValue({
          title: data.title,
          price: data.price,
          desc: data.desc,
          category: data.category,
          image: null,
        });
        setImageUrl(
          `${REACT_APP_API_URL}/product_images/${data._id}/${data.image}`
        );
        setIsBusy(false);
      }
    }
    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    if (show) {
      showNotify("Error", errorSave, "danger");
      setShow(false);
    }
  }, [errorSave]);

  useEffect(() => {
    if (show) {
      showNotify("Success", "Product Added", "success");
      setShow(false);
    }
  }, [successSave]);

  useEffect(() => {
    if (show) {
      showNotify("Success", "Product Updated", "success");
      setShow(false);
    }
  }, [successEdit]);

  const submitHandler = (values) => {
    let formData = new FormData();
    formData.append("title", values.title);
    formData.append("price", values.price);
    formData.append("desc", values.desc);
    formData.append("category", values.category);

    if (id) {
      formData.append("_id", id);
      formData.append("new_image", values.image);
      dispatch(saveProduct(formData, id));
    } else {
      formData.append("image", values.image);
      dispatch(saveProduct(formData));
    }
    setShow(true);
  };

  return (
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
      <h3 className="text-center">{id ? "Edit Product" : "Add Product"}</h3>
      {!isBusy && (
        <Formik
          initialValues={initValue}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Required"),
            price: Yup.number("Must be number")
              .required("Required")
              .nullable(true),
            category: Yup.string().required("Required"),
            desc: Yup.string().required("Required"),
            // image: Yup.mixed().test(
            //   "fileType",
            //   "File must be image",
            //   (value) =>
            //     value.type === "image/jpg" ||
            //     value.type === "image/jpeg" ||
            //     value.type === "image/png"
            // ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            //setSubmitting(true);
            submitHandler(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <FastField
                  type="text"
                  name="title"
                  label="Title"
                  placeholder="Title"
                  component={InputField}
                />
                {categories.length > 0 ? (
                  <FastField
                    name="category"
                    label="Category"
                    placeholder="--Select category--"
                    option={categories}
                    component={SelectedCategoryField}
                  />
                ) : null}
                <FastField
                  type="number"
                  name="price"
                  label="Price"
                  placeholder="price"
                  component={InputField}
                />
                <FastField
                  name="desc"
                  label="Description"
                  component={TextAreaField}
                />

                <FastField
                  name="image"
                  label="Image"
                  imageUrl={imageUrl}
                  component={UploadImageField}
                />

                <Forms.Group>
                  <button
                    type="submit"
                    className="btn btn-primary mr-3"
                    style={{ width: "150px" }}
                    disabled={isSubmitting}
                  >
                    {id ? "Update Product" : "Add Product"}
                  </button>
                  <button
                    type="reset"
                    className="btn btn-warning"
                    style={{ width: "150px" }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </Forms.Group>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default ProductAdd;
