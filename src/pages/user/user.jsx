import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserInfo } from '../../components/user-info/user-info';
import { UserOrders } from '../../components/user-orders/user-orders';
import './user.css';

function User({ user, setToken }) {
  const isAuth = Object.keys(user).length > 0;
  const [currentTab, setCurrentTab] = useState('info');

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  function logout() {
    localStorage.removeItem('token');
    setToken('');
  }

  return (
    <div className="user">
      <div className="container">
        <nav className="user__navigation">
          <button
            onClick={() => setCurrentTab('info')}
            className="user__button"
          >
            Личные данные
          </button>
          <button
            onClick={() => setCurrentTab('orders')}
            className="user__button"
          >
            Заказы
          </button>
          <button className="user__button user__button--red" onClick={logout}>
            Выйти из аккаунта
          </button>
        </nav>
        {currentTab === 'info' ? <UserInfo user={user} /> : null}
        {currentTab === 'orders' ? <UserOrders /> : null}
      </div>
    </div>
  );
}

export { User };
