import { IAddItemToCart, ICart } from '@/types/cart.type';
import { IProduct } from '@/types/product.type';
import { IUserState } from '@/types/userState.type';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export const addToCartHandler = (
  user: IUserState,
  product: IProduct | null,
  stock: number,
  cart: ICart,
  addItemToCart: (item: Partial<IAddItemToCart>) => void,
) => {
  if (!user.id) {
    return redirect('/login');
  }

  if (!user.isVerified) {
    return toast.info('Your account is not yet verified');
  }

  const cartItem: Partial<IAddItemToCart> = {
    productId: product?.id,
    name: product?.name,
    price: product?.price,
    image: product?.image,
    description: product?.description,
    stock: stock,
  };

  const itemExist = cart?.cartItems?.find(
    (i: Partial<IAddItemToCart>) => i.productId === product?.id,
  );

  if (itemExist) {
    const newQuantity: number = itemExist.quantity + 1;
    const item: Partial<IAddItemToCart> = {
      ...itemExist,
      quantity: newQuantity,
    };

    if (newQuantity > Number(itemExist.stock)) return;
    addItemToCart(item);
  } else {
    addItemToCart(cartItem);
  }

  toast.success('Product added successfully');
};
