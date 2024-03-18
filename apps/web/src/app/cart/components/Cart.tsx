/* eslint-disable @next/next/no-img-element */
'use client';
import { useContext, useEffect, useState } from 'react';
import CartContext from '@/context/CartContext';
import { IAddToCart } from '@/types/cart.type';
import Link from 'next/link';
import { numberToRupiah } from '@/app/utils/numberToRupiah';
import { useIncrementQty } from '@/hooks/cart/useIncrementQty';
import { useDecrementQty } from '@/hooks/cart/useDecrementQty';
import { calculateTotals } from '@/app/utils/calculateTotals';

const Cart = () => {
  const [subtotal, setSubtotal] = useState<number>(0);
  const { deleteItemFromCart, cart } = useContext(CartContext);
  useEffect(() => {
    calculateTotals({ cart, setSubtotal });
  }, [cart]);

  const { incrementQty } = useIncrementQty();

  const { decrementQty } = useDecrementQty();

  return (
    <>
      <div className="font-[sans-serif] bg-white">
        <div className="max-w-7xl mx-auto">
          {cart?.cartItems?.length > 0 ? (
            <div className="overflow-x-auto ">
              {cart?.cartItems?.map((cartItem: IAddToCart, index: number) => (
                <div key={index} className="md:mb-4 pb-4">
                  <div className="flex flex-col md:flex-row items-center md:mb-2 border p-4 lg:py-9">
                    <div className="md:w-1/3 md:mr-4 mb-4 md:mb-0">
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg mb-3 md:text-xl font-extrabold text-[#333]">
                        {cartItem.name}
                      </p>
                      <div className="flex items-center mb-2">
                        <div className="font-bold mr-4">Price:</div>
                        <div>{numberToRupiah(cartItem.price)}</div>
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="font-bold mr-4">Quantity:</div>
                        <div className="flex divide-x border">
                          <button
                            type="button"
                            className="bg-gray-100 px-2 py-1 font-semibold"
                            onClick={() => decrementQty(cartItem)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3 fill-current"
                              viewBox="0 0 124 124"
                            >
                              <path
                                d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="bg-transparent px-2 py-1 font-semibold text-[#333] text-md"
                          >
                            {cartItem.quantity}
                          </button>
                          <button
                            type="button"
                            className="bg-gray-800 text-white px-2 py-1 font-semibold"
                            onClick={() => incrementQty(cartItem)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3 fill-current"
                              viewBox="0 0 42 42"
                            >
                              <path
                                d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="font-bold mr-4">Total:</div>
                        <div className="text-lg font-bold text-[#333]">
                          {numberToRupiah(cartItem.price * cartItem.quantity)}
                        </div>
                      </div>
                      <div className="mb-4">
                        {' '}
                        <p className="text-[#333] font-medium">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse potenti. Sed tincidunt velit ac
                          neque ultricies, vitae bibendum velit sagittis. Sed
                          fringilla, odio et congue volutpat, lectus ligula
                          pharetra purus, id laoreet libero ex a nisl.
                        </p>
                      </div>
                      <div>
                        <a
                          className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            deleteItemFromCart(cartItem?.productId)
                          }
                        >
                          Remove
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center border px-10 py-44">
              <h1 className="text-3xl font-bold text-gray-600">Cart Empty</h1>
            </div>
          )}
          <div className="max-w-lg ml-auto shadow-sm p-8">
            <ul className="text-[#333] divide-y">
              <li className="flex flex-wrap gap-4 text-md py-3">
                Subtotal{' '}
                <span className="ml-auto font-bold">
                  {numberToRupiah(subtotal)}
                </span>
              </li>
            </ul>
            <Link href="/checkout">
              <button
                disabled={!subtotal && true}
                type="button"
                className={`mt-8 text-md px-6 py-2.5 w-full ${
                  !subtotal ? 'bg-blue-400' : 'bg-blue-600'
                } hover:bg-blue-700 text-white rounded`}
              >
                Check out
              </button>
            </Link>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Cart;
