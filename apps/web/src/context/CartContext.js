'use client';

import { createContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [],
    );
  };

  const addItemToCart = async ({
    productId,
    name,
    price,
    image,
    description,
    stock,
    branchId,
    seller,
    quantity = 1,
  }) => {
    const item = {
      productId,
      name,
      price,
      image,
      description,
      stock,
      branchId,
      seller,
      quantity,
    };

    const isItemExist = cart?.cartItems?.find(
      (i) => i.productId === item.productId,
    );

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.productId === isItemExist.productId ? item : i,
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem('cart', JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.productId !== id);

    localStorage.setItem('cart', JSON.stringify({ cartItems: newCartItems }));
    setCartToState();

    toast.success('product removed successfully');
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
