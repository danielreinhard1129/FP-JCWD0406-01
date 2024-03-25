import { IPaymentSuccessProps } from '@/types/props.type';
import Link from 'next/link';

const PaymentStatus = ({
  transactionStatus,
  transactionId,
}: IPaymentSuccessProps) => {
  return (
    <div>
      <div className="min-h-screen flex flex-col gap-10 items-center justify-center">
        {transactionStatus == 'capture' || transactionStatus == 'settlement' ? (
          <div className="max-w-xl">
            <h1 className="text-center">
              Great news! Your payment has been successfully received and
              processed. Thank you for choosing our services.
            </h1>
          </div>
        ) : transactionStatus == 'cancel' ||
          transactionStatus == 'deny' ||
          transactionStatus == 'expire' ? (
          <div className="max-w-xl">
            <h1 className="text-center">
              We regret to inform you that the payment for your recent
              transaction was unsuccessful. Please review your payment details
              and try again. If the issue persists, contact our customer support
              for assistance.
            </h1>
          </div>
        ) : transactionStatus == 'pending' ? (
          <div className="max-w-xl">
            <div className="text-center flex flex-col">
              <span>
                Dear valued customer, your payment is currently pending
                approval.
              </span>{' '}
              <span>Our team is diligently working on processing it.</span>{' '}
              <span>
                Thank you for your patience, and we will update you as soon as
                the payment status changes.
              </span>
            </div>
          </div>
        ) : null}
        <Link href={`/order-status/?transaction_id=${transactionId}`}>
          <button className="px-5 py-2 bg-green-500 rounded-md text-white">
            Order Status
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentStatus;
