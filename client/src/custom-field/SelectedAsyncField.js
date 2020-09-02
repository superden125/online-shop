import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import SelectAsync from "react-select/async";
import ErrorComponent from "./ErrorComponent";
import { ErrorMessage } from "formik";

function SelectedAsyncField(props) {
  const { field, form, label, placeholder, disabled, loadOptions } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const [selected, setSelected] = useState();

  const handleSelectChange = (selectOption) => {
    const selectValue = selectOption ? selectOption.value : selectOption;

    const changeEvent = {
      target: {
        name: name,
        value: selectValue,
      },
    };
    field.onChange(changeEvent);
  };

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <SelectAsync
        {...field}
        id={field.name}
        value={selected}
        onChange={handleSelectChange}
        //onInputChange={handleSelectChange}
        placeholder={placeholder}
        isDisabled={disabled}
        loadOptions={loadOptions}
      />
      <div className={showError ? "is-invalid" : ""}></div>
      <ErrorMessage name={name} component={ErrorComponent} />
    </Form.Group>
  );
}

SelectedAsyncField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
  loadOptions: PropTypes.func,
};

SelectedAsyncField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disable: false,
  loadOptions: null,
};

export default SelectedAsyncField;
