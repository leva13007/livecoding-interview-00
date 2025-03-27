import React from 'react';

export const ProductList = ({ products }) => (
  <>
    <h2>Product list</h2>
    {
      products.map(product => (
        <div key={product.id}>
          <div>{product.name} : Brand: {product.brand} : Rate: {product.rating} </div>
        </div>
      ))
    }
  </>
)