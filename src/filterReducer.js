export const PRICE_MIN = 0;
export const PRICE_MAX = 2000;

export const initialState = {
  category: "",
  price: {
    min: "",
    max: "",
  },
  brand: "",
  rate: "", // 1..5
}

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      }
    case "SET_PRICE":
      return {
        ...state,
        price: action.payload,
      }
    case "SET_BRAND":
      return {
        ...state,
        brand: action.payload,
      }
    case "SET_RATE":
      return {
        ...state,
        rate: action.payload,
      }
    case "CLEAN":
      return initialState
    default:
      return state;
  }
}