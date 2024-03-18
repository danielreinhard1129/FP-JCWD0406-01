import { sendMailInvalidPaymentProof } from '@/helpers/sendmail/invalid-payment-proof';
import { sendMailPaymentConfirmed } from '@/helpers/sendmail/payment-confirmed';
import { logger } from '@/logger';
import prisma from '@/prisma';
import { getTransactionById } from '@/repositories/transaction/getTransactionById';
import { updateTransactionStatus } from '@/repositories/transaction/updateTransactionStatus';
import { updateStatusByMidtransParams } from '@/types/params.type';
import { ITransaction } from '@/types/transaction.type';

export const updateStatusByMidtransAction = async ({
  transactionId,
  transactionStatus,
}: updateStatusByMidtransParams) => {
  try {
    await prisma.$transaction(async (transaction) => {
      try {
        const transactionById: ITransaction | any =
          await getTransactionById(transactionId);

        let status = 0;

        if (
          transactionStatus === 'capture' ||
          transactionStatus === 'settlement'
        ) {
          status = 3;
        } else if (
          transactionStatus === 'cancel' ||
          transactionStatus === 'deny' ||
          transactionStatus === 'expire' ||
          transactionStatus === 'pending'
        ) {
          status = 1;
        }

        await updateTransactionStatus(transactionId, status, transaction);

        if (status === 3) {
          sendMailPaymentConfirmed({
            user: transactionById?.user.username,
            orderId: transactionId,
            to: transactionById?.user.email,
          });
        }

        if (status === 1) {
          sendMailInvalidPaymentProof({
            user: transactionById?.user.username,
            orderId: transactionId,
            to: transactionById?.user.email, 
          });
        }

        logger.info(
          `update status by midtrans success with transactionId ${transactionId}`,
        );
      } catch (error) {
        throw error;
      }
    });

    return {
      message: `update status by midtrans success with transactionId ${transactionId}`,
      status: 200,
    };
  } catch (error) {
    throw error;
  }
};
