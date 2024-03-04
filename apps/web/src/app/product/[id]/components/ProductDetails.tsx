/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef, useContext, useState, useEffect } from 'react';
import CartContext from '@/context/CartContext';
import { useAppSelector } from '@/libs/hooks';
import { useRouter } from 'next/navigation';
import { IProduct } from '@/types/cart.type';
import { toast } from 'sonner';

const ProductDetails = ({ product }: any) => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const [stock, setStock] = useState(0);

  const { addItemToCart, cart } = useContext(CartContext);
  const imgRef = useRef(null);

  const readyStock = stock >= 1;

  setTimeout(() => {
    if (product?.stock?.length) {
      function calculateTotalAmount(product: any) {
        let totalAmount = 0;

        for (const stockItem of product?.stock) {
          totalAmount += stockItem.amount;
        }
        return totalAmount;
      }

      const totalAmount = calculateTotalAmount(product);
      setStock(totalAmount);
    }
  });

  const addToCartHandler = () => {
    // validasi user jika sudah login
    if (!user.id) {
      return router.push('/login');
    }

    // valiadsi user jika belum diverifikasi
    if (!user.isVerified) {
      return toast.info('Your account is not yet verified.');
    }

    const cartItem = {
      productId: product.id,
      branchStoreId: product.stock[0].branchId,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: stock,
    };

    const itemExist = cart?.cartItems?.find(
      (i: IProduct) => i.productId === product.id,
    );

    if (itemExist) {
      const newQuantity = itemExist.quantity + 1;
      const item = { ...itemExist, quantity: newQuantity };

      if (newQuantity > Number(itemExist.stock)) return;
      addItemToCart(item);
    } else {
      addItemToCart(cartItem);
    }
  };

  return (
    <>
      <section className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                <img
                  ref={imgRef}
                  className="object-cover inline-block"
                  src={product.image}
                  alt="product title"
                  width="340"
                  height="340"
                />
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{product.name}</h2>
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
                {product?.price
                  ? new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(product.price)
                  : ''}
              </p>
              <p className="mb-4 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit tempore, quidem qui quos sed voluptas natus ex
                vitae aperiam quaerat nostrum blanditiis sequi quasi esse nulla.
                Tempore dignissimos quidem saepe? Odio sequi eaque, corporis
                quisquam voluptate, dolor fugiat iste quam laborum beatae
                tempora est. Ipsum quo sed ab non qui eius reprehenderit nulla
                maiores eos officiis, expedita corrupti accusamus labore! Harum
                assumenda officiis, voluptates laborum laudantium qui, pariatur
                sint eveniet sed earum modi molestiae quaerat neque.
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                <button
                  className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  onClick={addToCartHandler}
                  disabled={!readyStock}
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
                    {product.category?.name}
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
