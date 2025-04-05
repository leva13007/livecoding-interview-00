import { useReducer } from 'react';
import { PRICE_MAX, PRICE_MIN, filterReducer } from "../filterReducer.js";

const initReducerHandler = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get("category") || "",
    price: {
      min: params.get("price_min") || "",
      max: params.get("price_max") || "",
    },
    brand: params.get("brand") || "",
    rate: params.get("rate") || "", // 1..5
  }
}


export const useFilters = () => {

  const [filters, dispatch] = useReducer(filterReducer, null, initReducerHandler);

  const reset = () => dispatch({
    type: 'CLEAN',
  })
  return {
    filters,
    dispatch,
    reset
  }
}