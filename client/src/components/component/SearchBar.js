import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

function SearchBar(props) {
  const { searchTerm, onChange } = props;
  const [search, setSearch] = useState(searchTerm);

  const typingTimeoutRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onChange(value);
    }, 1000);
  };

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="search"
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string,

  onChange: PropTypes.func,
};

SearchBar.defaultProps = {
  searchTerm: "",
  onChange: null,
};

export default SearchBar;
