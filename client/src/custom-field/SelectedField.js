import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Select from "react-select";

function SelectedField(props) {
  const { field, form, type, label, placeholder, disable, option } = props;
  const { name, value } = field;
  // const selectedOption = option.find((x) => x.slug === value);

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
  console.log(option);

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Select
        {...field}
        id={field.name}
        //      value={selectedOption}
        onChange={handleSelectChange}
        placeholder={placeholder}
        isDisabled={disable}
        options={option}
      />
    </Form.Group>
  );
}

SelectedField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
  option: PropTypes.array,
};

SelectedField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disable: false,
  option: [],
};

export default SelectedField;
