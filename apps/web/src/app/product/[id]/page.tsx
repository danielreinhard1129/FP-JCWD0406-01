'use client';
import { Spinner } from 'flowbite-react';
import ProductDetails from './components/ProductDetails';
import { useGetProductById } from '@/hooks/product/useGetProductById';

const ProductDetailPage = ({ params }: any) => {
  const id = parseInt(params.id, 10);
  const { data: product, isLoading } = useGetProductById(id);

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailPage;
