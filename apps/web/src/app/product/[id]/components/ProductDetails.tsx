/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef, useContext, useState } from 'react';
import CartContext from '@/context/CartContext';
import { useAppSelector } from '@/libs/hooks';
import { numberToRupiah } from '@/app/utils/numberToRupiah';
import { calculateTotalAmount } from '@/app/utils/calculateTotalAmount ';
import { addToCartHandler } from '@/app/utils/addToCartHandler';
import { IUserState } from '@/types/userState.type';
import { IProductDetailProps } from '@/types/props.type';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const ProductDetails = ({ product }: IProductDetailProps) => {
  const user: IUserState = useAppSelector((state) => state.user);
  const [stock, setStock] = useState<number>(0);
  const { addItemToCart, cart } = useContext(CartContext);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const readyStock: boolean = stock >= 1;
  const router = useRouter();

  setTimeout(() => {
    if (product?.stocks?.length) {
      const totalAmount = calculateTotalAmount(product);
      setStock(totalAmount);
    }
  });

  const handleAddToCart = () => {
    if (!user.id && !user.email) {
      toast.error('Please log in first to add items to your cart');
      return router.push('/login');
    }

    if (!user.isVerified) {
      return toast.info('Your account is not yet verified');
    }

    if (!readyStock) {
      return toast.error('Product in your cart is out of stock');
    }

    addToCartHandler(product, stock, cart, addItemToCart);
  };

  return (
    <>
      <section className="bg-white md:py-20">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                <img
                  ref={imgRef}
                  className="object-cover inline-block"
                  src={product?.image}
                  alt="product title"
                  width="340"
                  height="340"
                />
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>
              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                </svg>
                <span className="text-green-500">Verified</span>
              </div>
              <p className="mb-4 font-semibold text-xl">
                {product?.price ? numberToRupiah(product.price) : ''}
              </p>
              <p className="mb-4 text-gray-500">{product?.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                <button
                  className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  onClick={handleAddToCart}
                >
                  <i className="fa fa-shopping-cart mr-2"></i>
                  Add to cart
                </button>
              </div>

              <ul className="mb-5">
                <li className="mb-1">
                  {' '}
                  <b className="font-medium w-36 inline-block">Stock</b>
                  {readyStock ? (
                    <span className="text-green-500">Ready Stock</span>
                  ) : (
                    <span className="text-red-500">Sold Out</span>
                  )}
                </li>
                <li className="mb-1">
                  {' '}
                  <b className="font-medium w-36 inline-block">Category:</b>
                  <span className="text-gray-500">
                    {product?.category?.name}
                  </span>
                </li>
              </ul>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductDetails;
