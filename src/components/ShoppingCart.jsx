function ShoppingCart({ cartItems, onRemoveFromCart }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container my-4">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.name}</strong>
                  <div>
                    Quantity: {item.quantity} | Price: ${item.price}
                  </div>
                </div>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h4>Total: ${total.toFixed(2)}</h4>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;