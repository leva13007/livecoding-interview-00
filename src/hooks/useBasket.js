import { useReducer } from "react";

const initialState = [
  {
    id: "1",
    name: "Samsung Galaxy S23",
    category: "Smartphones",
    price: 899.99,
    brand: "Samsung",
    rating: 5,
    image: "https://example.com/samsung-galaxy-s23.jpg",
    quantity: 1
  }
];

// type basket_item = {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   brand: string;
//   rating: number;
//   image: string;
//   quantity: number;
// }

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (existingProduct) return state
        .map(item => item.id === action.payload.id ? {...item, quantity: item.quantity++} : item )
      return [...state, {...action.payload, quantity: 1}]
    }
    case "REMOVE_ITEM":
      return state.filter(item => item.id !== action.payload)
    case "CHANGE_QUANTITY":{
      console.log("action.payload", action.payload)
      return state
        .map(item => item.id === action.payload.id ? {...item, quantity: item.quantity + action.payload.delta} : item)
        .filter(item => item.quantity > 0)
    }
    case "CLEAR":
      return [];
    default: 
      return state;
  }
}


export const useBasket = () => {
  const [basket, dispatch] = useReducer(reducer, initialState);

  const addItemToBasket = (product) => dispatch({
    type: "ADD_ITEM",
    payload: product,
  })
  
  const removeItemFromBasket = (id) => dispatch({
    type: "REMOVE_ITEM",
    payload: id
  })

  const changeItemQuantity = ({id, delta}) => {
    dispatch({
      type: "CHANGE_QUANTITY",
      payload: {
        id, delta
      }
    })
  }

  const clearBasket = () => dispatch({type: "CLEAR"});

  const total = basket.reduce((sum, item) => sum + item.price*item.quantity, 0);
  return {
    basket, dispatch, total,
    addItemToBasket, removeItemFromBasket, changeItemQuantity, clearBasket
  }
}