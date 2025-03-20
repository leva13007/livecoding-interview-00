import React, { useEffect, useReducer } from "react";
import {PRICE_MAX, PRICE_MIN, filterReducer, initialState} from "./filterReducer.js";

const categories = [
  "Electronics",
  "Clothing",
  "Footwear",
  "Accessories",
  "Audio",
  "Laptops",
  "Smartphones",
  "Home Appliances",
  "Toys",
  "Books"
]

const brands = [
  "Samsung",
  "Apple",
  "Sony",
  "Nike",
  "Adidas",
  "LG",
  "Asus",
  "Dyson",
  "Garmin",
  "LEGO",
  "Amazon",
  "O'Reilly",
  "Bose",
  "Razer",
  "GoPro",
  "Xiaomi"
]

export const FilterProducts = ({
  fetchProducts,
}) => {
  const [filters, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    console.log("filters", filters)
    fetchProducts(filters);
  }, [filters]);

  return (
    <div>
      <h2>Filters</h2>
      <div>
        <select name="category" id="" onChange={e => dispatch({
          type: "SET_CATEGORY",
          payload: e.target.value
        })}>
          {
            categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))
          }
        </select>

        <div>
          <input type="number" min={PRICE_MIN} max={PRICE_MAX} onChange={e => dispatch({
            type: "SET_PRICE",
            payload: {...filters.price, min: e.target.value}
          })}/>
          <input type="number" min={PRICE_MIN} max={PRICE_MAX} onChange={e => dispatch({
            type: "SET_PRICE",
            payload: {...filters.price, max: e.target.value}
          })}/>
        </div>

        <select name="brands" id="" onChange={e => {
          console.log({
            type: "SET_BRAND",
            payload: e.target.value
          })
          dispatch({
            type: "SET_BRAND",
            payload: e.target.value
          })
        }}>
          {
            brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))
          }
        </select>
        <div>
          {
            [1, 2, 3, 4, 5].map(rate => (
              <label key={rate}>
                <input name="rate" type="radio" value={rate} onChange={e => dispatch({
                  type: "SET_RATE",
                  payload: e.target.value
                })}/>
                {rate}
              </label>
            ))
          }
        </div>
      </div>
    </div>
  )
}