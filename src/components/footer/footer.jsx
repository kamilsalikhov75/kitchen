import { Link } from 'react-router-dom';
import './footer.css';
import logo from '../../assets/logo.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <Link to="/index.html" className="footer__link">
          <img src={logo} className="footer__img" />
        </Link>
      </div>
    </footer>
  );
}

export { Footer };
