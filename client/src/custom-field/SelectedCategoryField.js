import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Select from "react-select";

function SelectedCategoryField(props) {
  const { field, form, type, label, placeholder, disable, option } = props;
  const { name, value } = field;

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

  const parseOption = (data) => {
    let option = [];
    data.forEach((item) => {
      option.push({ value: item.slug, label: item.title });
    });
    return option;
  };

  const options = parseOption(option);

  const selectedOption = options.find((x) => x.value === value);
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Select
        {...field}
        id={field.name}
        value={selectedOption}
        onChange={handleSelectChange}
        placeholder={placeholder}
        isDisabled={disable}
        options={options}
      />
    </Form.Group>
  );
}

SelectedCategoryField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
  option: PropTypes.array,
};

SelectedCategoryField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disable: false,
  option: [],
};

export default SelectedCategoryField;
