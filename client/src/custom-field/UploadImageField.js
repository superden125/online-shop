import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { ErrorMessage } from "formik";
import ErrorComponent from "./ErrorComponent";
import UploadImage from "../components/component/UploadImage";

function UploadImageField(props) {
  const { field, form, label, disable, imageUrl } = props;
  const { name, value, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleOnChange = (file) => {
    form.setFieldValue(name, file);
  };

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}

      <UploadImage
        name="image"
        image={value}
        imageUrl={imageUrl}
        onImageChange={handleOnChange}
        onImageBlur={onBlur}
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

UploadImageField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
  imageUrl: PropTypes.string,
};

UploadImageField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disable: false,
  imageUrl: "",
};

export default UploadImageField;
