import axios from 'axios';
import { useState } from 'react';
import { api } from '../../const';
import { RegistrationLoading } from './registration-loading';

function Registration({ setIsRegistration, setIsPopupActive, setToken }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function closePopup(e) {
    if (e.target.className === 'auth') {
      setIsPopupActive(false);
    }
  }
  async function register() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return alert('Не заполнены поля');
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${api}/register`, {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        window.localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
      }
    } catch (error) {
      console.log(error);
      alert('Не удалось зарегистрироваться');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <RegistrationLoading />;
  }

  return (
    <div className="auth" onClick={closePopup}>
      <div className="auth__block">
        <form
          className="auth__form"
          onSubmit={(event) => {
            event.preventDefault();
            register();
          }}
        >
          <h1 className="auth__title">Регистрация</h1>
          <input
            type="text"
            className="auth__input"
            placeholder="Имя"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
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
            Зарегистрироваться
          </button>
          <p className="auth__text">Уже есть аккаунт?</p>
        </form>
        <button
          onClick={() => setIsRegistration(false)}
          className="auth__button"
        >
          Авторизация
        </button>
      </div>
    </div>
  );
}

export { Registration };
