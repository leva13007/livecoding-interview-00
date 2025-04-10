import {useBasket} from './hooks/useBasket';
import {products} from './data';


export const Basket = () => {

  const {basket, total, addItemToBasket, removeItemFromBasket, changeItemQuantity, clearBasket} = useBasket();

  const addRandomProductHandler = () => {
    const index = Math.floor(Math.random() * products.length);
    addItemToBasket(products[index])
  }

  return (
    <div>

      <button onClick={addRandomProductHandler}>Add random product to the Basket</button>

      <h1>Basket</h1>

      {
        basket.length === 0 ? (
          <div>
            Your basket is empty would you like to got the shop and got some Products?
          </div>
        ) : (
          <>
            <button onClick={clearBasket}>Clear basket</button>
            <ul>
              {
                basket.map((item) => (
                  <li key={item.id}>
                    <span>{item.name} :: ${item.price} - {item.quantity}</span>
                    <button onClick={() => changeItemQuantity({id: item.id, delta: 1})}>+</button>
                    <button onClick={() => changeItemQuantity({id: item.id, delta: -1})}>-</button>
                    <button onClick={() => removeItemFromBasket(item.id)}>remove</button>
                  </li>
                ))
              }
            </ul>
            <div>
              Total: ${total}
            </div>
          </>
        )
      }
    </div>
  )
}