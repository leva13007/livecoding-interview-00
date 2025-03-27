import React, { useEffect, useReducer, memo } from "react";
import { PRICE_MAX, PRICE_MIN, filterReducer } from "./filterReducer.js";

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

export const FilterProducts = memo(({
  fetchProducts,
}) => {
  const [filters, dispatch] = useReducer(filterReducer, null, initReducerHandler);
  console.log("FilterProducts", filters)

  useEffect(() => {
    console.log("filters", filters)
    fetchProducts(filters);
  }, [filters]);

  const minPrice = Math.max(filters.price.min, PRICE_MIN);
  const maxPrice = Math.min(filters.price.max, PRICE_MAX);

  return (
    <div>
      <h2>Filters</h2>
      <div>
        <select
          value={filters.category}
          name="category"
          onChange={e => dispatch({
            type: "SET_CATEGORY",
            payload: e.target.value
          })}
        >
          <option key="all" value="">All</option>
          {
            categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))
          }
        </select>

        <div>
          <label>Price min:</label>
          <input
            value={filters.price.min}
            type="number"
            min={PRICE_MIN}
            max={maxPrice}
            step={1}
            onChange={e => dispatch({
              type: "SET_PRICE",
              payload: { ...filters.price, min: e.target.value }
            })}
          />
          <label htmlFor="">Price max</label>
          <input
            value={filters.price.max}
            type="number"
            min={minPrice}
            max={PRICE_MAX}
            step={1}
            onChange={e => dispatch({
              type: "SET_PRICE",
              payload: { ...filters.price, max: e.target.value }
            })}
          />
        </div>

        <select
          value={filters.brand}
          name="brands"
          onChange={e => {
            console.log({
              type: "SET_BRAND",
              payload: e.target.value
            })
            dispatch({
              type: "SET_BRAND",
              payload: e.target.value
            })
          }}
        >
          <option key="all" value="">All</option>
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
                <input
                  checked={rate === Number(filters.rate)}
                  name="rate"
                  type="radio"
                  value={rate}
                  onChange={e => dispatch({
                    type: "SET_RATE",
                    payload: e.target.value
                  })}
                />
                {rate}
              </label>
            ))
          }
        </div>
        <div>
          <button onClick={() => dispatch({
            type: "CLEAN"
          })}>Clear filters</button>
        </div>
      </div>
    </div>
  )
})