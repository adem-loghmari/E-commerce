import { useEffect, useState } from 'react';

const useFetchProducts = (endpoint) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, [endpoint]);

  return products;
};

export default useFetchProducts;
