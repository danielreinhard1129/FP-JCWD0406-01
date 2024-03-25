/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import CartContext from '@/context/CartContext';
import { useContext, useEffect, useState } from 'react';
import SelectAddress from './SelectAddress';
import { useAppSelector } from '@/libs/hooks';
import PaymentMethod from './PaymentMethod';
import { usePaymentByMidtrans } from '@/hooks/payment/usePaymentByMidtrans';
import { usePaymentByManual } from '@/hooks/payment/usePaymentByManual';
import { useCalculateTotals } from '@/hooks/calculate/useCalculateTotals';
import BranchService from './BranchService';
import { useGetBranchByGeolocation } from '@/hooks/branch/useGetBranchByGeolocation';
import { numberToRupiah } from '@/app/utils/numberToRupiah';
import { IUserState } from '@/types/userState.type';
import { redirect, useRouter } from 'next/navigation';
import { ISelectedAddress } from '@/types/address.type';
import { IAddToCart } from '@/types/cart.type';

const Checkout = () => {
  const user: IUserState = useAppSelector((state) => state.user);
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const [shipping, setShipping] = useState<number>(25000);
  const [tax, setTax] = useState<number>(10000);
  const [message, setMessage] = useState<string>('');
  const [selectedAddress, setSelectedAddress] =
    useState<ISelectedAddress | null>(null);
  const [total, setTotal] = useState<number>(0);

  const { branchService } = useGetBranchByGeolocation({ selectedAddress });

  const { snapShow, handlePaymentByMidtrans } = usePaymentByMidtrans({
    branchId: branchService?.nearestBranch?.id as number,
    total,
    selectedAddress,
    setSelectedAddress,
    user,
    message,
    cart,
    setMessage,
    router,
  });

  const { handlePaymentByManual } = usePaymentByManual({
    branchId: branchService?.nearestBranch?.id as number,
    selectedAddress,
    total,
    user,
    cart,
    message,
    setMessage,
    setSelectedAddress,
  });

  const { subtotal, item } = useCalculateTotals({
    cart,
    shipping,
    tax,
    setTotal,
  });

  useEffect(() => {
    if (!cart?.cartItems?.length) redirect('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="font-[sans-serif] bg-white">
        <div className="max-lg:max-w-xl mx-auto w-full">
          {!snapShow && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 max-lg:order-1 p-4 max-w-4xl mx-auto w-full">
                <div className="text-center max-lg:hidden">
                  <h2 className="text-3xl font-extrabold text-[#333] inline-block border-b-4 border-[#333] pb-1">
                    Checkout
                  </h2>
                </div>
                <div className="lg:mt-12">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#333] mb-4">
                      Select Delivery Address
                    </h3>
                    <SelectAddress
                      selectedAddress={selectedAddress}
                      setSelectedAddress={setSelectedAddress}
                    />
                  </div>
                  <div className="text-[#333] mt-14 mb-4">
                    <h3 className="text-xl font-extrabold text-[#333] mb-4">
                      Select Your Nearest Branch
                    </h3>
                    <BranchService
                      branchName={branchService?.nearestBranch?.name as string}
                      address={branchService?.nearestBranch?.address as string}
                      distance={branchService?.distance as string}
                    />
                  </div>
                  <div className="text-[#333] mt-14 mb-4">
                    <h3 className="text-xl font-extrabold text-[#333] mb-4">
                      Order List
                    </h3>
                    {cart?.cartItems?.map((product: Partial<IAddToCart>) => (
                      <div
                        key={product.productId}
                        className="flex py-10 px-4 md:px-10 md:py-5 justify-between border"
                      >
                        <div className="flex gap-3 md:gap-20 items-center">
                          <div className="font-semibold">
                            {product.quantity}x
                          </div>
                          <div className="font-semibold gap-3 flex items-center">
                            <img
                              src={product.image}
                              className="h-10 w-10"
                              alt="product"
                            />
                            {product.name}
                          </div>
                        </div>
                        <div className="font-semibold flex items-center">
                          {numberToRupiah(product?.price as number)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#333] mt-14 mb-4">
                      Message
                    </h3>
                    <textarea
                      id="pesan"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      name="pesan"
                      rows={4}
                      className="mt-1 p-2 w-full border rounded-md"
                      style={{ resize: 'none' }}
                    />
                  </div>
                  <div>
                    <PaymentMethod
                      handlePay={handlePaymentByMidtrans}
                      handlePaymentByManual={handlePaymentByManual}
                    />
                  </div>
                </div>
              </div>
              <div className="lg:h-[300px] lg:sticky lg:top-0 border-spacing-3 shadow-md mx-4 lg:px-5">
                <div className="relative h-[290px]">
                  <div className="p-4 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
                    <h2 className="text-2xl font-extrabold text-[#333]">
                      Order Summary
                    </h2>
                    <div className="space-y-6 mt-12 font-semibold">
                      <div className="grid grid-cols-2 items-start gap-6">
                        <div className="font-semibold">Items({item}):</div>
                        <div className="text-end">
                          {' '}
                          {numberToRupiah(subtotal)}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-start gap-6">
                        <div className="">Fee Shipping:</div>
                        <div className="text-end">
                          {numberToRupiah(shipping)}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-start gap-6">
                        <div className="">Tax</div>
                        <div className="text-end"> {numberToRupiah(tax)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-0 bottom-0 w-full p-4 mb-2">
                    <h4 className="flex flex-wrap gap-4 text-base text-[#333] font-semibold">
                      Total{' '}
                      <span className="ml-auto">{numberToRupiah(total)}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div id="snap-container" className="flex justify-center mt-10"></div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
