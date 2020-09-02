import React, { useEffect, useState } from "react";

import { REACT_APP_API_URL, formatMoney } from "../../config";
import PaginationCus from "../component/PaginationCus";
import { useSelector, useDispatch } from "react-redux";
import { listProduct } from "../../action/productAction";
import CheckBox from "../component/CheckBox";
import { listCategory } from "../../action/categoryAction";
import SearchBar from "../component/SearchBar";
import RadioPrice from "../component/RadioPrice";

function ShopPage(props) {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    totalRow: 1,
  });
  const [filters, setFilters] = useState({
    limit: 8,
    page: 1,
    category: [],
    price: "",
    sortBy: "",
    order: 1,
    searchTerm: "",
  });

  const productList = useSelector((state) => state.productList);
  const { loading, result, error } = productList;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProduct(filters));

    return () => {};
  }, [filters]);
  useEffect(() => {
    dispatch(listCategory());
  }, []);

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  const handleChangeCheckCate = (value) => {
    setFilters({
      ...filters,
      category: value,
    });
  };

  const handleSearch = (value) => {
    setFilters({
      ...filters,
      searchTerm: value,
    });
  };

  return loading ? (
    <div className="text-center">Loading...</div>
  ) : error ? (
    <div className="text-center">{error}</div>
  ) : (
    <div className="container-fluid">
      {/* <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="search"
            className="form-control"
          ></input>
          <button className="btn btn-info mt-2">Search</button>
        </div>
      </div> */}
      <div className="row">
        <div className="col-md-2 ml-2 mr-2">
          <SearchBar searchTerm={filters.searchTerm} onChange={handleSearch} />
          {categories && (
            <CheckBox
              list={categories}
              onChange={handleChangeCheckCate}
              value={filters.category}
            />
          )}
          <RadioPrice />
          {/* <input type="checkbox"></input>
          <label>yen cao cap</label>
          <br />
          <input type="checkbox"></input>
          <label>yen tinh che</label>
          <br />
          <input type="checkbox"></input>
          <label>yen chua tinh che</label> */}
        </div>
        <div className="col-md-9">
          <div className="row">
            {result.results ? (
              result.results.map((product, i) => (
                <div
                  className="col-md-3 col-sm-4 col-6 p"
                  key={i}
                  onClick={() =>
                    props.history.push("/shop/product/" + product._id)
                  }
                >
                  <div className="products">
                    <img
                      className="img-products"
                      src={`${REACT_APP_API_URL}/product_images/${product._id}/${product.image}`}
                      alt="product"
                    />

                    <h5>{product.title}</h5>

                    <p>{formatMoney(product.price)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>There are no product</div>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <PaginationCus
          pagination={result.pagination ? result.pagination : pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ShopPage;
