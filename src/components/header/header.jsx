import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logo from '../../assets/logo.svg';
import { Registration } from '../registration/registration';
import { Login } from '../login/login';
import { useState } from 'react';
import { category } from '../../const';

function Header({ user, setToken }) {
  const isAuth = Object.keys(user).length > 0;
  const [isRegistration, setIsRegistration] = useState(true);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    if (isAuth) {
      navigate('/user');
    } else {
      setIsPopupActive(true);
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__top">
          <Link to="/index.html" className="header__link">
            <img src={logo} className="header__img" />
          </Link>
          <div className="header__link">
            <a onClick={handleClick} className="header__link">
              Личный кабинет
            </a>
            <Link to="/cart" className="header__link">
              Корзина
            </Link>
          </div>
        </div>
        <nav className="header__navigation">
          <Link to="/products/cooking" className="header__navigation-link">
            {category.cooking}
          </Link>
          <Link to="/products/serving" className="header__navigation-link">
            {category.serving}
          </Link>
          <Link to="/products/cutlery" className="header__navigation-link">
            {category.cutlery}
          </Link>
          <Link to="/products/accessories" className="header__navigation-link">
            {category.accessories}
          </Link>
        </nav>
      </div>
      {isPopupActive && isRegistration ? (
        <Registration
          setIsPopupActive={setIsPopupActive}
          setIsRegistration={setIsRegistration}
          setToken={setToken}
        />
      ) : null}
      {isPopupActive && !isRegistration ? (
        <Login
          setIsPopupActive={setIsPopupActive}
          setIsRegistration={setIsRegistration}
          setToken={setToken}
        />
      ) : null}
    </header>
  );
}

export { Header };
