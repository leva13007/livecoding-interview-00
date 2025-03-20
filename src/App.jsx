import React from 'react';

import {FilterProducts} from './FilterProducts.jsx';
import {ProductList} from './ProductList.jsx';
import {products} from './data.js';

import './App.css';


const fetchAPI = (url) => {
  return new Promise((res) => {
    setTimeout(() => {
      const parcerURL = new URL(url);
      res(products)
    }, 1500)
  })
}

function App() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const fetchProductsHandler = async (filtes) => {
    setLoading(true)
    const params = new URLSearchParams()

    if (filtes.category) params.append("category",filtes.category)
    if (filtes.price.min) params.append("price_min",filtes.price.min)
    if (filtes.price.max) params.append("price_max",filtes.price.max)
    if (filtes.brand) params.append("brand",filtes.brand)
    if (filtes.rate) params.append("brand",filtes.rate)

    console.log("params", params.toString());

    if(params.toString()) window.history.pushState(null, "", `?${params.toString()}`)
    
    try{
      const data = await fetchAPI(`${location.origin}/products?${params.toString()}`)
      setProducts(data)
    } catch (e){
      console.warn(e)
    } finally {
      setLoading(false)
    }
  }

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
