import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listCategory,
  saveCategory,
  deleteCategory,
} from "../../action/categoryAction";

import { isEmpty } from "validator";
import { showNotify } from "../component/Notify";

function Category() {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [errors, setErrors] = useState("");

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, categories, error } = categoryList;
  const categorySave = useSelector((state) => state.categorySave);
  const { loadingSave, category } = categorySave;
  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { loadingDelete, resDelete } = categoryDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (category && category.success) {
      showNotify("Success!", " ", "success");
      onCancelCategory();
    }

    if (resDelete && resDelete.success) {
      showNotify("Deleted!", " ", "danger");
      onCancelCategory();
    }
    dispatch(listCategory());
    return () => {};
  }, [category, resDelete]);

  const onDelete = (e, id) => {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var confirm = window.confirm("Do you want delete this category!");
    if (!confirm) {
      return;
    } else {
      dispatch(deleteCategory(id));
    }
  };

  const validation = () => {
    var error = "";
    if (isEmpty(title)) error = "Title not empty!";
    if (error) {
      setErrors(error);
      return false;
    }
    return true;
  };

  const onEditCategory = (category) => {
    setErrors("");
    setId(category._id);
    setTitle(category.title);
    setIsUpdate(true);
  };

  const onSaveCategory = (e) => {
    e.preventDefault();
    if (validation()) {
      setErrors("");
      let formData = new FormData();
      formData.append("title", title);

      dispatch(saveCategory(formData, id));
    }
  };

  const onCancelCategory = () => {
    setId("");
    setTitle("");
    setIsUpdate(false);
  };

  return categories ? (
    <div>
      <div className="row">
        <div className="col-md-4 offset-1">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            {errors && (
              <span className="alert-danger form-control">{errors}</span>
            )}
          </div>
          <div className="form-group">
            {isUpdate ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => onSaveCategory(e)}
              >
                Update
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => onSaveCategory(e)}
              >
                Add
              </button>
            )}
            <button
              type="button"
              className="btn btn-light"
              onClick={() => onCancelCategory()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4 offset-1">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} onClick={() => onEditCategory(category)}>
                  <td>{category.title}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        onDelete(e, category._id);
                      }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div>There are no category</div>
  );
}

export default Category;
