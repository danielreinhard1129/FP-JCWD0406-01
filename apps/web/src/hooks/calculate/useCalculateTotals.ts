import { useEffect, useState } from 'react';
import { IAddToCart } from '@/types/cart.type';

interface IProduct {
  branchId: number;
  image: string;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  seller: string;
  stock: number;
}

interface Icart {
  cartItems: IProduct[];
}

interface ICalculateParams {
  cart: Icart;
  shipping: number;
  tax: number;
  setTotal: (input: number) => void;
}

export const useCalculateTotals = ({
  cart,
  shipping,
  tax,
  setTotal,
}: ICalculateParams) => {
  const [subtotal, setSubtotal] = useState(0);
  const [item, setItem] = useState(0);

  useEffect(() => {
    const calculateTotals = () => {
      let subTotal = 0;

      cart?.cartItems?.forEach((cartItem: IAddToCart) => {
        subTotal += cartItem.price * cartItem.quantity;
      });

      let total = 0;
      cart?.cartItems?.forEach((cartItem: IAddToCart) => {
        total += cartItem.quantity;
      });

      setItem(total);

      const newSubtotal = subTotal.toFixed(2);
      const newTotal = (subTotal + shipping + tax).toFixed(2);

      setSubtotal(Number(newSubtotal));
      setTotal(Number(newTotal));
    };

    calculateTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, shipping, tax]);

  return {
    subtotal,
    item,
  };
};
