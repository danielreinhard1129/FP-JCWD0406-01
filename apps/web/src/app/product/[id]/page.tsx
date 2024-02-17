'use client';
import axios from 'axios';
import ProductDetails from './components/ProductDetails';
import { useEffect, useState } from 'react';

const ProductDetailPage = ({ params }: any) => {
  const [product, setProduct] = useState([]);
  const baseUrl = 'http://localhost:8000/api';

  const getProduct = async () => {
    try {
      const product = await axios.post(baseUrl + '/products/filter/id', {
        id: parseInt(params.id, 10),
      });
      setProduct(product.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ProductDetails product={product} />;
};

export default ProductDetailPage;
