import {
    CLEAR_ERRORS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
  } from "../constants/orderConstant";
  
  const initialState = {
    loading: false,
    error: null,
    order: null,
  };
  
  //order
  export const newOrderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          order: action.payload,
        };
      case CREATE_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  //my order 
  export const myOrderReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
      case MY_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case MY_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: action.payload,
        };
      case MY_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  //order details
  export const orderDetailsReducer = (state={order:{}},action)=>{
      switch (action.type) {
          case ORDER_DETAILS_REQUEST:
            return {
              ...state,
              loading: true,
            };
          case ORDER_DETAILS_SUCCESS:
            return {
              ...state,
              loading: false,
              order: action.payload,
            };
          case ORDER_DETAILS_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
      
          default:
            return state;
        }
  };