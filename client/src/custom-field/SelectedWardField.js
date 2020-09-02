import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { ErrorMessage, useFormikContext } from "formik";
import ErrorComponent from "./ErrorComponent";
import SelectAsyncAddress from "../components/component/SelectAsyncAddress";
import axios from "axios";
import { formatWord } from "../config";

function SelectedWardField(props) {
  const { field, form, label, disabled, placeholder } = props;
  const { name, value } = field;

  const {
    values: { district },
    touched,
    setFieldValue,
  } = useFormikContext();

  const { errors } = form;
  const showError = errors[name] && touched[name];

  const [idDistrict, setIdDistrict] = useState(-1);

  useEffect(() => {
    setIdDistrict(district.id);
  }, [district, touched.district, setFieldValue, name]);

  const handleOnChange = (value) => {
    form.setFieldValue(name, value);
  };

  const loadOptions = async (inputValue, callback) => {
    const res = await axios.get(`api/district/${idDistrict}/ward`);
    const data = res.data.filter((i) =>
      formatWord(i.Title.toLowerCase()).includes(
        formatWord(inputValue.toLowerCase())
      )
    );
    console.log(res.data);
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
        disabled={idDistrict ? false : true}
        placeholder={placeholder}
      />

      
      <div className={showError ? "is-invalid" : ""}></div>
      <ErrorMessage name={name} component={ErrorComponent} />
    </Form.Group>
  );
}

SelectedWardField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

SelectedWardField.defaultProps = {
  label: "",
  placeholder: "",
  disabled: false,
};

export default SelectedWardField;
