import React, { useState } from "react";
import PropTypes from "prop-types";
import SelectedAsync from "react-select/async";

function SelectAsyncAddress(props) {
  const {
    name,
    loadOptions,
    placeholder,
    disabled,
    onChange,
    onBlur,
    value,
  } = props;

  const [selected, setSelected] = useState();

  const handleSelectChange = (selectOption) => {
    const selectValue = selectOption ? selectOption.value : selectOption;
    onChange(selectValue);
  };

  return (
    <SelectedAsync
      id={name}
      value={value}
      onChange={handleSelectChange}
      placeholder={placeholder}
      isDisabled={disabled}
      loadOptions={loadOptions}
      onBlur={onBlur}
    />
  );
}

SelectAsyncAddress.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,

  loadOptions: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

SelectAsyncAddress.defaultProps = {
  name: "",
  placeholder: "",
  disabled: false,
  loadOptions: null,
  onChange: null,
  onBlur: null,
};

export default SelectAsyncAddress;
