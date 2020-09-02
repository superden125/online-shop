import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

function UploadImage(props) {
  const { name, image, onImageChange, onImageBlur, imageUrl } = props;

  const handleImageChange = async (e) => {
    if (onImageChange) {
      if (e.target.files && e.target.files[0]) {
        onImageChange(e.target.files[0]);
      }
    }
  };

  return (
    <div>
      <Form.Control
        type="file"
        name={name}
        accept="image/*"
        onChange={(e) => handleImageChange(e)}
        onBlur={onImageBlur}
      />
      {image ? (
        <img src={URL.createObjectURL(image)} width="200px" height="200px" />
      ) : (
        <img src={imageUrl} width="200px" height="200px" alt="Oops..." />
      )}
    </div>
  );
}

UploadImage.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  onImageChange: PropTypes.func,
};

UploadImage.defaultProps = {
  name: "",
  imageUrl: "",
  onImageChange: null,
};

export default UploadImage;
