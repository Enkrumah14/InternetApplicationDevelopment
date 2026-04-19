import { useEffect, useState } from 'react';
import NavBar from './components/NavBar.jsx';
import SearchBar from './components/SearchBar.jsx';
import Card from './components/Card.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch('http://localhost:3000/cart')
      .then((res) => res.json())
      .then((data) => setCartItems(data));
  }, []);

  async function addToCart(product) {
    const existingItem = cartItems.find((item) => item.productId === product.id);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + 1;

      await fetch(`http://localhost:3000/cart/${existingItem.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: updatedQuantity }),
      });

      setCartItems(
        cartItems.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: updatedQuantity }
            : item
        )
      );
    } else {
      const newCartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      };

      const res = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCartItem),
      });

      const savedItem = await res.json();
      setCartItems([...cartItems, savedItem]);
    }
  }

  async function removeFromCart(id) {
    await fetch(`http://localhost:3000/cart/${id}`, {
      method: 'DELETE',
    });

    setCartItems(cartItems.filter((item) => item.id !== id));
  }

  return (
    <div>
      <NavBar />
      <SearchBar />

      <div className="container my-4">
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-md-6 col-lg-3" key={product.id}>
              <Card product={product} onAddToCart={addToCart} />
            </div>
          ))}
        </div>
      </div>

      <ShoppingCart
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
      />
    </div>
  );
}

export default App;