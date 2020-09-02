import React from "react";
import PropTypes from "prop-types";

function ErrorComponent(props) {
  return <span className="text-danger">{props.children}</span>;
}

ErrorComponent.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

ErrorComponent.defaultProps = {
  errorMessage: "Error",
};

export default ErrorComponent;
