import React, { use } from 'react';

export const ProductList = ({ products }) => {
  const data = use(products);
  return (
    <>
      <h2>Product list</h2>
      {
        data.map(product => (
          <div key={product.id}>
            <div>{product.name} : Brand: {product.brand} : Rate: {product.rating} </div>
          </div>
        ))
      }
    </>
  )
}