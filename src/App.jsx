import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Main } from './pages/main/main';
import { User } from './pages/user/user';
import { Loading } from './pages/loading/loading';
import axios from 'axios';
import { api } from './const';
import { Products } from './pages/products/products';
import { Product } from './pages/product/product';
import { Cart } from './pages/cart/cart';

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem('cart')) || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(
    window.localStorage.getItem('token') || ''
  );

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      const promise = axios.get(`${api}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      promise
        .then((response) => response.data)
        .then((data) => setUser(data))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    } else {
      setUser('');
    }
  }, [token]);

  useEffect(() => {
    try {
      window.localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.log(error);
    }
  }, [cart]);

  if (isLoading) {
    return <Loading isMain={true} />;
  }

  return (
    <>
      <Header user={user} setToken={setToken} />
      <Routes>
        <Route path="/index.html" element={<Main />} />
        <Route
          path="/user"
          element={<User user={user} setToken={setToken} />}
        />
        <Route path="/products/:currentCategory" element={<Products />} />
        <Route
          path="/cart"
          element={
            <Cart
              user={user}
              cart={cart}
              setCart={setCart}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<Product cart={cart} setCart={setCart} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
