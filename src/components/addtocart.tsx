import React, { useState } from 'react';

// ProductItem Component (represents a single product)
const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

// ShoppingCart Component (displays the cart items)
const ShoppingCart = ({ cartItems, onRemoveFromCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ border: '1px solid #eee', padding: '10px', margin: '10px' }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity} - ${item.price * item.quantity}
              <button onClick={() => onRemoveFromCart(item.id)} style={{ marginLeft: '10px' }}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

// App Component (main component managing products and cart)
const App = () => {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 },
  ]);

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (productToAdd) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        // If item exists, increase its quantity
        return prevCartItems.map((item) =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If item is new, add it with quantity 1
        return [...prevCartItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productIdToRemove) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productIdToRemove)
    );
  };

  return (
    <div>
      <h1>Product List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
      <ShoppingCart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
    </div>
  );
};

export default App;