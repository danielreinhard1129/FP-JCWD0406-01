import { updateTransactionPaymentProof } from '@/repositories/transaction/updateTransactionPaymentProof';
import { updateTransactionStatus } from '@/repositories/transaction/updateTransactionStatus';
import { getTransactionById } from '@/repositories/transaction/getTransactionById';
import { logger } from '@/logger';
import prisma from '@/prisma';
import { sendMailPaymentReceivedVerification } from '@/helpers/sendmail/payment-received-verification';

export const updateTransactionPaymentProofAction = async (
  transactionId: string,
  paymentProof: string,
) => {
  try {
    await prisma.$transaction(async (transaction: any) => {
      try {
        const transactionById: any = await getTransactionById(transactionId);

        if (!transactionById) {
          logger.error(`transaction with id ${transactionId} not found`);
          throw new Error(`transaction with id ${transactionId} not found`);
        }

        const statusId = 2;
        await updateTransactionPaymentProof(
          transactionId,
          paymentProof,
          transaction,
        );

        await updateTransactionStatus(transactionId, statusId, transaction);

        sendMailPaymentReceivedVerification({
          user: transactionById?.user.username,
          orderId: transactionById?.orderId,
          to: transactionById?.user.email,
        });

        logger.info(
          `update transaction payment proof success with transaction id ${transactionId}`,
        );
      } catch (error) {
        throw error;
      }
    });

    return {
      message: `update transaction payment proof success with transaction id ${transactionId}`,
      status: 200,
    };
  } catch (error) {
    throw error;
  }
};
