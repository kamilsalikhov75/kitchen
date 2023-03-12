import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, category } from '../../const';
import { ProductCard } from '../../components/product-card/product-card';
import { Loading } from '../loading/loading';
import './products.css';

function Products() {
  const { currentCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const promise = axios.get(`${api}/products/${currentCategory}`);

    promise
      .then((response) => response.data)
      .then((data) => setProducts(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [currentCategory]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="products">
      <div className="container">
        <h1 className="products__title">{category[currentCategory]}</h1>
        <div className="products__block">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { Products };
