'use client';
import { Header } from '@/components/Header';
import ProductDetails from './components/ProductDetails';
import { useGetProductById } from '@/hooks/product/useGetProductById';
import Footer from '@/components/Footer';
import { IProductDetaiParams } from '@/types/params.type';

const ProductDetailPage = ({ params }: { params: IProductDetaiParams }) => {
  const id: number = parseInt(params.id, 10);
  const { data: product } = useGetProductById(id);

  return (
    <div>
      <Header />
      <ProductDetails product={product} />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
