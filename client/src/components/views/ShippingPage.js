import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, FastField } from "formik";
import { Form as Forms } from "react-bootstrap";
import SelectedAsyncField from "../../custom-field/SelectedAsyncField";
import InputField from "../../custom-field/InputField";
import { formatWord } from "../../config";
import SelectedDistrictField from "../../custom-field/SelectedDistrictField";
import SelectedWardField from "../../custom-field/SelectedWardField";
import SelectedCityField from "../../custom-field/SelectedCityField";
function ShippingPage(props) {
  const [city, setCity] = useState();
  const { onSubmitShipping } = props;

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/city");
      setCity(res.data.LtsItem);
    }
    fetchData();
  }, []);

  const initialValues = {
    city: {},
    district: "",
    ward: "",
    address: "",
    phone: null,
  };
  const validationSchema = Yup.object().shape({
    city: Yup.string().required("Required"),
    district: Yup.string().required("Required"),
    ward: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    phone: Yup.number("Must be number").required("Required").nullable(true),
  });
  const handleSubmit = (values) => {
    onSubmitShipping(values);
  };

  return (
    <div>
      <h3 className="mt-3">Shipping</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <FastField
                name="city"
                label="City"
                placeholder="type city"
                //loadOptions={loadOptionsCity}
                component={SelectedCityField}
              />
              <FastField
                name="district"
                label="District"
                placeholder="type district"
                //loadOptions={loadOptionsDistrict}
                //disabled={true}
                component={SelectedDistrictField}
              />
              <FastField
                type="text"
                name="ward"
                label="Ward"
                placeholder="type ward"
                component={SelectedWardField}
              />
              <FastField
                type="text"
                name="address"
                label="Address"
                placeholder="Ex: 12/34/56 Foot Street..."
                component={InputField}
              />
              <FastField
                type="number"
                name="phone"
                label="Number Phone"
                placeholder="Ex: 0123456789"
                component={InputField}
              />
              <Forms.Group>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  Process to Checkout
                </button>
                <button
                  type="reset"
                  className="btn btn-warning btn-block"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </Forms.Group>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

ShippingPage.propTypes = {
  onSubmitShipping: PropTypes.func,
};

ShippingPage.defaultProps = {
  onSubmitShipping: null,
};

export default ShippingPage;
