const {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_SAVE_REQUEST,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_SAVE_EDIT_SUCCESS,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
} = require("../constants/categoryConstants");

function categoryListReducer(state = { categories: [] }, action) {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function categorySaveReducer(state = { category: {} }, action) {
  switch (action.type) {
    case CATEGORY_SAVE_REQUEST:
      return { loadingSave: true, category: {} };
    case CATEGORY_SAVE_SUCCESS:
      return {
        loadingSave: false,
        category: action.payload,
      };
    case CATEGORY_SAVE_EDIT_SUCCESS:
      return {
        loadingSave: false,
        category: action.payload,
      };
    case CATEGORY_LIST_FAIL:
      return { loadingSave: false, error: action.payload };
    default:
      return state;
  }
}

function categoryDeleteReducer(state = { category: {} }, action) {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loadingDelete: true, resDelete: {} };
    case CATEGORY_DELETE_SUCCESS:
      return {
        loadingDelete: false,
        resDelete: action.payload,
      };
    case CATEGORY_DELETE_FAIL:
      return { loadingDelete: false, error: action.payload };
    default:
      return state;
  }
}

export { categoryListReducer, categorySaveReducer, categoryDeleteReducer };
