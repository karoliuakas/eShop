import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_UPDATE_QTY_REQUEST, PRODUCT_UPDATE_QTY_SUCCESS, PRODUCT_UPDATE_QTY_FAIL } from "../constants/productConstants";
import Axios from "axios";

const listProducts = ({ name=''}) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await Axios.get(`/api/products?name=${name}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  }
  catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }

};

const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await Axios.post('/api/products', {}, {
      headers:
      {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: PRODUCT_CREATE_SUCCESS, payload: data.product,
    })

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message })

  }
};
const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await Axios.put(`/api/products/${product._id}`, product, {
      headers:
      {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message })
  }

};

const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const { userSignin: { userInfo } } = getState();

  try {
    Axios.delete(`/api/products/${productId}`, {
      headers:
      {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};
const createReview = (productId, review) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await Axios.post(`/api/products/${productId}/reviews`, review, {
      headers:
      {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data.review,
    })

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: PRODUCT_CREATE_REVIEW_FAIL, payload: message })

  }
};

const updateProductQty = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_QTY_REQUEST, payload: product });
  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await Axios.put(`/api/products/${product._id}/update`, product, {
      headers:
      {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: PRODUCT_UPDATE_QTY_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: PRODUCT_UPDATE_QTY_FAIL, error: message })
  }

};


export { listProducts, detailsProduct, createProduct, deleteProduct, updateProduct, createReview, updateProductQty };