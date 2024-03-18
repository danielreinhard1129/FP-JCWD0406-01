import { IPaymentMethodProps } from '@/types/props.type';

const PaymentMethod = ({
  handlePay,
  handlePaymentByManual,
}: IPaymentMethodProps) => {
  return (
    <div className="flex gap-4 mt-3  md:mt-12 p-1 justify-center text-xs lg:text-base">
      <button
        onClick={() => {
          handlePaymentByManual();
        }}
        className="bg-green-500 text-white font-semibold p-4 md:py-4 md:px-8 rounded-lg shadow-md hover:bg-green-700"
      >
        Transfer Manual
      </button>

      <button
        onClick={() => {
          handlePay();
        }}
        className="bg-green-500 text-white font-semibold p-4 md:py-4 md:px-8 rounded-lg shadow-md hover:bg-green-700"
      >
        Payment Gateway
      </button>
    </div>
  );
};

export default PaymentMethod;
