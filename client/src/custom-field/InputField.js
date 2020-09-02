import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { ErrorMessage } from "formik";
import ErrorComponent from "./ErrorComponent";

function InputField(props) {
  const { field, form, type, label, placeholder, disable } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  // const ErrorComponent = () => {
  //   return <span className="text-danger">{errors[name]}</span>;
  // };

  return (
    <Form.Group>
      {label && <Form.Label htmlFor={name}>{label}</Form.Label>}
      <Form.Control
        type={type}
        {...field}
        id={name}
        disabled={disable}
        isInvalid={showError}
        placeholder={placeholder}
      />

      <ErrorMessage name={name} component={ErrorComponent} />
    </Form.Group>
  );
}

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disable: false,
};

export default InputField;
