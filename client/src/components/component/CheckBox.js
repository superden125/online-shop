import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

function CheckBox(props) {
  const { list, onChange, value } = props;

  const [valueCheck, setValueCheck] = useState([]);

  const handleChange = (e) => {
    if (value.indexOf(e.target.value) === -1) {
      value.push(e.target.value);
    } else {
      value.splice(value.indexOf(e.target.value), 1);
    }
    onChange(value);
  };

  return (
    <div>
      {list &&
        list.map((item) => (
          <Form.Check
            type="checkbox"
            label={item.title}
            value={item.slug}
            onChange={(e) => handleChange(e)}
            key={item._id}
            checked={value.indexOf(item.slug) === -1 ? false : true}
          />
        ))}
    </div>
  );
}

CheckBox.propTypes = {
  list: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,

  onChange: PropTypes.func,
};

CheckBox.defaultProps = {
  list: [],
  value: [],
  onChange: null,
};

export default CheckBox;
