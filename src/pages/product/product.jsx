import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../const';
import { Loading } from '../loading/loading';
import './product.css';

function Product({ cart, setCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const promise = axios.get(`${api}/product/${id}`);

    promise
      .then((response) => response.data)
      .then((data) => setProduct(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  function addProduct() {
    if (cart.find((item) => item.id === id)) {
      const cartProducts = cart.map((product) => {
        if (product.id === id) {
          return { ...product, count: product.count + 1 };
        } else {
          return product;
        }
      });
      setCart(cartProducts);
    } else {
      const cartProducts = [...cart, { id, count: 1 }];
      setCart(cartProducts);
    }
  }

  return (
    <div className="product">
      <div className="container">
        <h1 className="product__title">{product.name}</h1>
        <div className="product__block">
          <img src={`${api}${product.image}`} className="product__img" />
          <div className="product__info">
            <h3 className="product__price">{product.price} ₽</h3>
            <button onClick={addProduct} className="product__button">
              Добавить в корзину
            </button>
            <p className="product__text">Размер: {product.size}</p>
            <p className="product__text">Вес : {product.weight} г.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Product };
