import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { ErrorMessage, useFormikContext } from "formik";
import ErrorComponent from "./ErrorComponent";
import SelectAsyncAddress from "../components/component/SelectAsyncAddress";
import axios from "axios";
import { formatWord } from "../config";

function SelectedCityField(props) {
  const { field, form, label, disabled, placeholder } = props;
  const { name, value } = field;

  const { setFieldValue } = useFormikContext();

  const { errors, values, touched } = form;
  const showError = errors[name] && touched[name];

  //   useEffect(() => {
  //     setIdCity(values.city.id);
  //   }, [city, touched.city, setFieldValue, name]);

  const handleOnChange = (value) => {
    form.setFieldValue(name, value);
    setFieldValue("district", {});
    setFieldValue("ward", {});
  };

  const loadOptions = async (inputValue, callback) => {
    const res = await axios.get("/api/city");
    const data = res.data.LtsItem.filter((i) =>
      formatWord(i.Title.toLowerCase()).includes(
        formatWord(inputValue.toLowerCase())
      )
    );

    callback(
      data.map((i) => ({ label: i.Title, value: { id: i.ID, value: i.Title } }))
    );
  };
  const parseOption = (data) => {
    return { label: data.value, value: data };
  };

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}

      <SelectAsyncAddress
        value={parseOption(value)}
        name={name}
        loadOptions={loadOptions}
        onChange={handleOnChange}
        disabled={disabled}
        placeholder={placeholder}
      />

      <ErrorMessage
        name={name}
        errorMessage={errors[name]}
        component={ErrorComponent}
      />
      <div className={showError ? "is-invalid" : ""}></div>
      <ErrorMessage name={name} component={ErrorComponent} />
    </Form.Group>
  );
}

SelectedCityField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

SelectedCityField.defaultProps = {
  label: "",
  placeholder: "",
  disabled: false,
};

export default SelectedCityField;
