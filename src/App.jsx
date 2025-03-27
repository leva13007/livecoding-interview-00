import React, { useCallback } from 'react';

import { FilterProducts } from './FilterProducts.jsx';
import { ProductList } from './ProductList.jsx';
import { products } from './data.js';

import './App.css';


const fetchAPI = (url) => {
  return new Promise((res) => {
    console.log("fetchAPI", url)

    setTimeout(() => {
      const params = new URLSearchParams((new URL(url)).search);
      const category = params.get("category");
      const price_min = params.get("price_min");
      const price_max = params.get("price_max");
      const brand = params.get("brand");
      const rate = params.get("rate");

      const result = products.filter(product => {
        if (category) {
          return product.category === category
        } return true
      }).filter(product => {
        if (brand) {
          return product.brand === brand
        } return true
      }).filter(product => {
        if (rate) {
          return +product.rating === +rate
        } return true
      }).filter(product => {
        if (price_min) {
          return +product.price_min >= +price_min
        } return true
      }).filter(product => {
        if (price_max) {
          return +product.price_max <= +price_max
        } return true
      });
      res(result)
    }, 1500)
  })
}

function App() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchProductsHandler = useCallback(async (filtes) => {
    setLoading(true)
    const params = new URLSearchParams()

    if (filtes.category) params.append("category", filtes.category)
    if (filtes.price.min) params.append("price_min", filtes.price.min)
    if (filtes.price.max) params.append("price_max", filtes.price.max)
    if (filtes.brand) params.append("brand", filtes.brand)
    if (filtes.rate) params.append("rate", filtes.rate)

    console.log("params", params.toString());

    if (params.toString()) {
      window.history.pushState(null, "", `?${params.toString()}`)
    } else {
      window.history.pushState(null, "", "/")
    }

    try {
      const data = await fetchAPI(`${location.origin}/products?${params.toString()}`)
      setProducts(data)
    } catch (e) {
      console.warn(e)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <>
      <h1>E-Shop</h1>
      <FilterProducts fetchProducts={fetchProductsHandler} />
      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <ProductList products={products} />
        )
      }
    </>
  )
}

export default App
