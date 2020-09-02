import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function TextAreaField(props) {
  const { field, form, label, placeholder, disable } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const ErrorComponent = () => {
    return <span className="text-danger">{errors[name]}</span>;
  };

  const handleChange = (e, editor) => {
    const data = editor.getData();

    const changeEvent = {
      target: {
        name: name,
        value: data,
      },
    };
    field.onChange(changeEvent);
  };

  const handleBlur = (e, editor) => {
    const blurEvent = {
      target: {
        name: name,
        id: name,
      },
    };
    field.onBlur(blurEvent);
  };

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <CKEditor
        {...field}
        editor={ClassicEditor}
        id={name}
        disable={disable}
        data={value}
        onChange={(e, editor) => handleChange(e, editor)}
        onBlur={(e, editor) => handleBlur(e, editor)}
        config={{
          ckfinder: {
            // Upload the images to the server using the CKFinder QuickUpload command.
            uploadUrl: ``,
          },
        }}
      />
      <ErrorComponent name={name} component={ErrorComponent} />
    </Form.Group>
  );
}

TextAreaField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
};

TextAreaField.defaultProps = {
  label: "",
  placeholder: "",
  disable: false,
};

export default TextAreaField;
