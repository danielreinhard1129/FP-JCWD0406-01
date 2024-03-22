/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import CartContext from '@/context/CartContext';
import { axiosInstance } from '@/libs/axios';
import { loginAction, logoutAction } from '@/libs/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/libs/hooks';
import { ICartItem } from '@/types/cart.type';
import { IUser } from '@/types/user.type';
import { IUserState } from '@/types/userState.type';
import { Avatar, Dropdown } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { IoBagHandle } from 'react-icons/io5';
import { toast } from 'sonner';

export const Header = () => {
  const router = useRouter();
  const user: IUserState = useAppSelector((state) => state.user);
  const { cart } = useContext(CartContext);
  const cartItems: ICartItem[] = cart?.cartItems;
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token_auth');
      dispatch(logoutAction());
      router.push('/');
      toast.success('Logout success');
    } catch (error) {
      console.log(error);
    }
  };

  const keepLogin = async () => {
    const token: string = localStorage.getItem('token_auth') as string;
    try {
      if (!token) return;

      const data = await axiosInstance.get('/users/keeplogin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response: IUser = data?.data.data;
      response.id;
      dispatch(loginAction(response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    keepLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [countdown, setCountdown] = useState<number>(
    parseInt(localStorage.getItem('countdown') || '0', 10),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          clearInterval(interval);
          return prevCountdown;
        }

        const newCountdown: number = prevCountdown - 1;
        localStorage.setItem('countdown', newCountdown.toString());

        if (newCountdown <= 0) {
          clearInterval(interval);
        }

        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="py-4 shadow-sm bg-white border-2">
      <div className="container flex items-center justify-around">
        <a href="">
          <img src="/shop.png" className="w-8 md:w-10" alt="" />
        </a>
        <div className="hidden md:flex gap-2">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-[400px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
          <button className="px-5 py-2 bg-green-500 text-white rounded-lg">
            Search
          </button>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <a
            href="#"
            className=" text-gray-700 hover:text-green-500 transition relative"
          >
            <div className="text-2xl mx-3">
              <FaRegHeart />
            </div>
            <div className="text-xs leading-3">Wish List</div>
            <span className="absolute right-1 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-green-500 text-white text-xs">
              0
            </span>
          </a>
          <Link
            href="/cart"
            className=" text-gray-700 hover:text-green-500 transition relative"
          >
            <div className="text-2xl mx-3">
              <IoBagHandle />
            </div>
            <div className="text-xs leading-3 text-center">Cart</div>
            <span className="absolute right-1 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-green-500 text-white text-xs">
              {cartItems?.length || 0}
            </span>
          </Link>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              !user.image ? (
                <Avatar rounded />
              ) : (
                <img
                  src={user.image}
                  className="h-10 w-10 rounded-full object-cover"
                />
              )
            }
          >
            <Dropdown.Header>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            {!user.email ? (
              <Link href="/login">
                <Dropdown.Item>Log in</Dropdown.Item>
              </Link>
            ) : (
              <>
                <Link href={`/order-history`}>
                  <Dropdown.Item>Order history</Dropdown.Item>
                </Link>
                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
              </>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
