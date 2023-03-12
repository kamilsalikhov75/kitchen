import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartProduct } from '../../components/cart-product/cart-product';
import { api } from '../../const';
import { Loading } from '../loading/loading';
import './cart.css';

function Cart({ user, cart, setCart, token, setToken }) {
  const isAuth = Object.keys(user).length > 0;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const price = products.length ? sumCart() : '';
  const [address, setrAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length) {
      setIsLoading(true);
      const promise = axios.get(`${api}/products`);

      promise
        .then((response) => response.data)
        .then((data) => setProducts(data))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (!cart.length) {
    return (
      <div className="cart">
        <div className="container">
          <h1 className="cart__title">Корзина пуста</h1>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  function sumCart() {
    const sum = cart.reduce((sum, current) => {
      const currentProduct = products.find(
        (product) => product._id === current.id
      );
      return sum + currentProduct.price * current.count;
    }, 0);
    return sum;
  }

  async function createOrder() {
    if (!address.trim()) {
      alert('Заполните адрес');
      return;
    }
    if (!isAuth) {
      alert('Для совершения заказа нужно авторизоваться');
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${api}/orders`,
        { products: cart, price, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setToken(window.localStorage.getItem('token'));
        navigate('/user');
      }
    } catch (error) {
      console.log(error);
      alert('Не удалось создать заказ');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="cart__products">
          {products.length &&
            cart.map((item) => {
              const cartProduct = products.find(
                (product) => product._id === item.id
              );
              return (
                <CartProduct
                  key={item.id}
                  product={cartProduct}
                  count={item.count}
                  cart={cart}
                  setCart={setCart}
                />
              );
            })}
        </div>
        <p className="cart__price">Итого: {price} ₽</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            createOrder();
          }}
          className="cart__form"
        >
          <input
            type="text"
            className="cart__input"
            placeholder="Адрес доставки"
            value={address}
            onChange={(event) => setrAddress(event.target.value)}
          />
          <button type="submit" className="cart__button">
            Оформить заказ
          </button>
        </form>
      </div>
    </div>
  );
}

export { Cart };
