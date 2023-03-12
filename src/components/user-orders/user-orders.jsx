import axios from 'axios';
import { useEffect, useState } from 'react';
import { api } from '../../const';
import './user-orders.css';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const promise = axios.get(`${api}/orders`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
    promise
      .then((response) => response.data)
      .then((data) => setOrders(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="user__orders">
        <h1>Загрузка</h1>
      </div>
    );
  }

  return (
    <div className="user__orders">
      {orders.map((order, index) => (
        <div className="user__order" key={order._id}>
          <div className="user__order-top">
            <p className="user__order-text">Заказ №{index + 1}</p>
            <p className="user__order-text">
              Дата заказа:
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="user__order-text">{order.price} ₽</p>
            <p className="user__order-text">Статус: {order.status}</p>
            <p className="user__order-text">Адрес: {order.address}</p>
          </div>
          <div className="user__order-products">
            {order.products.map((product) => (
              <div key={product._id} className="user__order-product">
                <p className="user__order-text">{product.id.name}</p>
                <p className="user__order-text">{product.count} шт.</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { UserOrders };
