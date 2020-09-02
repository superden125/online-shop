import axios from "axios";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_SAVE_REQUEST,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_SAVE_EDIT_SUCCESS,
  CATEGORY_SAVE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
} from "../constants/categoryConstants";
import categoryApi from "../api/categoryApi";

const listCategory = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const data = await categoryApi.getAll();
    //const { data } = await axios.get("/admin/category");
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};

const saveCategory = (category, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category });
    const {
      userLogin: { userInfo },
    } = getState();

    if (!id) {
      const data = await categoryApi.add(category);
      //const { data } = await axios.post("/admin/category/add", category, {
      // headers: {
      //   Authorization: "Superd" + userInfo.token,
      // },
      //});

      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
    } else {
      const data = await categoryApi.edit(category, id);

      dispatch({ type: CATEGORY_SAVE_EDIT_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message });
  }
};

const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const data = await categoryApi.delete(id);
    //const { data } = await axios.delete("/admin/category/delete/" + id);
    // , {
    //   headers: { Authorization: "Superd" + userInfo.token },
    // });
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.message });
  }
};

export { listCategory, saveCategory, deleteCategory };
