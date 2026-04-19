function Card({ product, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="card h-100 shadow-sm text-dark">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />

      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>

        <p className="card-text">{product.description}</p>

        <p className="fw-bold">${product.price}</p>

        <button
          className="btn btn-warning"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;