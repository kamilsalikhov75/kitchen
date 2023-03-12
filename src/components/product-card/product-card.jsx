import { Link } from 'react-router-dom';
import { api } from '../../const';
import './product-card.css';

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <img src={`${api}${product.image}`} className="product-card__img" />
      <h3 className="product-card__title">{product.name}</h3>
      <p className="product-card__price">{product.price} ₽</p>
    </Link>
  );
}

export { ProductCard };
