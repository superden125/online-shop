import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { ErrorMessage, useFormikContext } from "formik";
import ErrorComponent from "./ErrorComponent";
import SelectAsyncAddress from "../components/component/SelectAsyncAddress";
import axios from "axios";
import { formatWord } from "../config";

function SelectedDistrictField(props) {
  const { field, form, label, disabled, placeholder } = props;
  const { name, value } = field;

  const {
    values: { city },
    touched,
    setFieldValue,
  } = useFormikContext();

  //const { errors, touched, values } = form;
  const { errors } = form;
  const showError = errors[name] && touched[name];

  const [idCity, setIdCity] = useState(-1);

  useEffect(() => {
    setIdCity(city.id);
  }, [city, touched.city, setFieldValue, name]);

  const handleOnChange = (value) => {
    form.setFieldValue(name, value);
    form.setFieldValue("ward", {});
  };

  const loadOptionsDistrict = async (inputValue, callback) => {
    const res = await axios.get(`/api/city/${idCity}/district`);
    const data = res.data.filter((i) =>
      formatWord(i.Title.toLowerCase()).includes(
        formatWord(inputValue.toLowerCase())
      )
    );
    //console.log(res.data);
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
        loadOptions={loadOptionsDistrict}
        onChange={handleOnChange}
        disabled={idCity ? false : true}
        placeholder={placeholder}
      />

      
      <div className={showError ? "is-invalid" : ""}></div>
      <ErrorMessage name={name} component={ErrorComponent} />
    </Form.Group>
  );
}

SelectedDistrictField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

SelectedDistrictField.defaultProps = {
  label: "",
  placeholder: "",
  disabled: false,
};

export default SelectedDistrictField;
