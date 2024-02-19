/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef, useContext, useState } from 'react';
import CartContext from '@/context/CartContext';
import { useAppSelector } from '@/libs/hooks';
import { useRouter } from 'next/navigation';
import { IProduct } from '@/types/cart.type';
import Image from 'next/image';
import { Breadcrumb, Button } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import useGetProductById from '@/app/hooks/products/useGetProductById';
import { FaShoppingCart } from 'react-icons/fa';

const ProductDetails = ({ id }: any) => {
  let [sum, setSum] = useState(0);
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  const { data } = useGetProductById(parseInt(id, 0));

  // const { addItemToCart, cart } = useContext(CartContext);
  const imgRef = useRef(null);

  // const readyStock = product.amount >= 1;

  const addToCartHandler = () => {
    // validasi user jika sudah login
    // if(user.id === 0){
    //   return router.push("/login")
    // }
    // const cartItem = {
    //   productId: product.product.id,
    //   name: product.product.name,
    //   price: product.product.price,
    //   image: product.product.image,
    //   stock: product.amount,
    //   seller: product.storeBranch.name,
    // };
    // const itemExist = cart.cartItems.find(
    //   (i: IProduct) => i.productId === product.product.id,
    // );
    // if (itemExist) {
    //   const newQuantity = itemExist.quantity + 1;
    //   const item = { ...itemExist, quantity: newQuantity };
    //   if (newQuantity > Number(itemExist.stock)) return;
    //   addItemToCart(item);
    // } else {
    //   addItemToCart(cartItem);
    // }
  };

  return (
    <>
      {data && (
        <section className="bg-white py-10">
          <Breadcrumb
            aria-label="Default breadcrumb example"
            className="ml-20 mb-5"
          >
            <Breadcrumb.Item href="/" icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/products">products</Breadcrumb.Item>
            <Breadcrumb.Item>{data?.name}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
              <aside>
                <div className="border border-gray-200 shadow-sm  text-center rounded mb-5">
                  <Image
                    ref={imgRef}
                    className="object-cover  h-96 w-full"
                    src={data?.image || ''}
                    alt="data title"
                    width="340"
                    height="40"
                    quality={100}
                  />
                </div>
              </aside>
              <main>
                <h2 className="font-semibold text-2xl mb-4">{data?.name}</h2>
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
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(data?.price)}{' '}
                  /{' '}
                  <span className="opacity-80 font-normal">
                    {data?.weight} {data?.unitWeight?.toLowerCase()}
                  </span>
                </p>
                <p className="mb-4 text-gray-500">{data?.description}</p>

                <div className="mb-4 bg-[#f3faf5] w-max p-4">
                  <p>
                    Availabillity :{' '}
                    {data.stock.amount > 0 ? (
                      <span className="text-green-500">
                        132 Products Available
                      </span>
                    ) : (
                      <span className="text-red-500">Sold Out</span>
                    )}
                  </p>
                </div>

                <div className="flex  flex-wrap gap-2 mb-5"> 
                  <div className='flex border-2 border-black mr-10 items-center rounded-lg justify-between w-[20%]'>
                    <button onClick={() => setSum((prev) => prev > 0 ? sum--: sum)} className='hover:bg-gray-200 h-full px-4 rounded-lg'>-</button>
                    <p>{sum}</p>
                    <button onClick={() => setSum((prev) => prev < data.stock.amount ? sum++ : sum)} className='hover:bg-gray-200 h-full px-4 rounded-lg' disabled={!Boolean(data.stock.amount && data.stock.amount > 0)}>+</button>
                  </div>
                  <Button
                    color="success"
                    className="px-4 py-2 inline-block text-white border border-transparent rounded-m"
                    onClick={addToCartHandler}
                    disabled={
                      !Boolean(data.stock.amount && data.stock.amount > 0 )
                    }
                  >
                    <FaShoppingCart className="mr-3" />
                    Add to cart
                  </Button>
                </div>

                <ul className="mb-5">
                  <li className="mb-1">
                    {' '}
                    <b className="font-medium w-36 inline-block">Category:</b>
                    <span className="border-2 px-2 rounded-sm font-semibold text-green-500">
                      {data?.category.name}
                    </span>
                  </li>
                  <li className="mb-1">
                    {' '}
                    <b className="font-medium w-36 inline-block">
                      Seller / Brand :
                    </b>
                    <span className="text-gray-500">
                      {data?.stock?.StoreBranch?.name || 'uknown'}
                    </span>
                  </li>
                </ul>
              </main>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default ProductDetails;
