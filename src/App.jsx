import React, { Suspense } from 'react';

import { ErrorBoundary } from './ErrorBoundary.jsx';
import { FilterProducts } from './FilterProducts.jsx';
import { ProductList } from './ProductList.jsx';
import { products } from './data.js';

import { useFilters } from './hooks/useFilters.js';
import { buildURL } from './services/usrBuilder.js';
import { fetchAPI } from './services/fetchAPI.js';

import './App.css';

function App() {

  const {
    filters,
    dispatch,
    reset
  } = useFilters();

  const params = buildURL(filters)
  const data = fetchAPI(`${location.origin}/products?${params.toString()}`, products)

  return (
    <>
      <h1>E-Shop</h1>
      <FilterProducts
        filters={filters}
        dispatch={dispatch}
        reset={reset}
      />
      <ErrorBoundary fallback={<h2>Something's going wrong! Pls refresh the page or wait a little! Thx!</h2>}>
        <Suspense fallback={<div>Loading... from Suspense</div>}>
          <ProductList products={data} />
        </Suspense>
      </ErrorBoundary>

    </>
  )
}

export default App
