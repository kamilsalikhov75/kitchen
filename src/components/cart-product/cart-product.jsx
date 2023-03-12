import { api } from '../../const';
import './cart-product.css';

function CartProduct({ product, count, cart, setCart }) {
  function addProduct() {
    const cartProducts = cart.map((item) => {
      if (item.id === product._id) {
        return { ...item, count: item.count + 1 };
      } else {
        return item;
      }
    });
    setCart(cartProducts);
  }

  function minusProduct() {
    if (count > 1) {
      const cartProducts = cart.map((item) => {
        if (item.id === product._id) {
          return { ...item, count: item.count - 1 };
        } else {
          return item;
        }
      });
      setCart(cartProducts);
    } else {
      const cartProducts = cart.filter((item) => item.id !== product._id);
      setCart(cartProducts);
    }
  }

  return (
    <div className="cart-product">
      <img src={`${api}${product.image}`} className="cart-product__img" />
      <p className="cart-product__text">{product.name}</p>
      <p className="cart-product__price">Цена:{product.price} ₽</p>
      <div className="cart-product__counter">
        <button onClick={minusProduct} className="cart-product__button">
          <svg
            width="23"
            height="6"
            viewBox="0 0 23 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.5 0.65625H1.75C0.887207 0.65625 0.1875 1.35596 0.1875 2.21875V3.78125C0.1875 4.64404 0.887207 5.34375 1.75 5.34375H20.5C21.3628 5.34375 22.0625 4.64404 22.0625 3.78125V2.21875C22.0625 1.35596 21.3628 0.65625 20.5 0.65625Z"
              fill="white"
            />
          </svg>
        </button>
        <p className="cart-product__count">{count}</p>
        <button onClick={addProduct} className="cart-product__button">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.375 8.65625H13.3438V1.625C13.3438 0.762207 12.644 0.0625 11.7812 0.0625H10.2188C9.35596 0.0625 8.65625 0.762207 8.65625 1.625V8.65625H1.625C0.762207 8.65625 0.0625 9.35596 0.0625 10.2188V11.7812C0.0625 12.644 0.762207 13.3438 1.625 13.3438H8.65625V20.375C8.65625 21.2378 9.35596 21.9375 10.2188 21.9375H11.7812C12.644 21.9375 13.3438 21.2378 13.3438 20.375V13.3438H20.375C21.2378 13.3438 21.9375 12.644 21.9375 11.7812V10.2188C21.9375 9.35596 21.2378 8.65625 20.375 8.65625Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <p className="cart-product__price">Всего:{product.price * count} ₽</p>
    </div>
  );
}

export { CartProduct };
