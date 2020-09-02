import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";

function PaginationCus(props) {
  const { pagination, onPageChange } = props;
  const { page, totalRow } = pagination;

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  let items = [];
  for (let number = 1; number <= totalRow; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>
        <Pagination.First
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        />
        {items}
        <Pagination.Last
          disabled={page >= totalRow}
          onClick={() => handlePageChange(page + 1)}
        />
      </Pagination>
    </div>
  );
}

PaginationCus.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

PaginationCus.defaultProps = {
  onPageChange: null,
};

export default PaginationCus;
