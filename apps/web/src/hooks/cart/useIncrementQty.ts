import CartContext from '@/context/CartContext';
import { IAddToCart, ICartItem } from '@/types/cart.type';
import { useContext } from 'react';

export const useIncrementQty = () => {
  const { addItemToCart } = useContext(CartContext);

  const incrementQty = (cartItem: IAddToCart) => {
    const newQuantity: number = cartItem.quantity + 1;
    const item: Partial<ICartItem> = { ...cartItem, quantity: newQuantity };

    if (newQuantity > Number(cartItem.stock)) return;

    addItemToCart(item);
  };

  return {
    incrementQty,
  };
};
