import axios from 'axios';
import { useState } from 'react';
import { api } from '../../const';
import { LoginLoading } from './login-loading';

function Login({ setIsRegistration, setIsPopupActive, setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoginLoading />;
  }

  function closePopup(e) {
    if (e.target.className === 'auth') {
      setIsPopupActive(false);
    }
  }

  async function login() {
    if (!email.trim() || !password.trim()) {
      return alert('Не заполнены поля');
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${api}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        window.localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
      }
    } catch (error) {
      console.log(error);
      alert('Не удалось авторизоваться');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth" onClick={closePopup}>
      <div className="auth__block">
        <form
          className="auth__form"
          onSubmit={(event) => {
            event.preventDefault();
            login();
          }}
        >
          <h1 className="auth__title">Авторизация</h1>
          <input
            type="text"
            className="auth__input"
            placeholder="Электронная почта"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            className="auth__input"
            placeholder="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" className="auth__button">
            Авторизоваться
          </button>
          <p className="auth__text">Еще не зарегистрированы?</p>
        </form>
        <button
          className="auth__button"
          onClick={() => setIsRegistration(true)}
        >
          Регистрация
        </button>
      </div>
    </div>
  );
}

export { Login };
