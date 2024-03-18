import { returnStock } from '@/repositories/stock/returnStock';
import { returnStockById } from '@/repositories/stock/returnStockById';
import { createJurnalHistory } from '@/repositories/jurnal/createJurnalHistory';
import { getStockMutationByOrderId } from '@/repositories/mutation/getStockMutationByOrderId';
import { getTransactionById } from '@/repositories/transaction/getTransactionById';
import { getTransactionDetailByOrderId } from '@/repositories/transaction/getTransactionDetailByOrderId';
import { updateTransactionPaymentProof } from '@/repositories/transaction/updateTransactionPaymentProof';
import { updateTransactionStatus } from '@/repositories/transaction/updateTransactionStatus';
import schedule from 'node-schedule';
import { logger } from '@/logger';
import prisma from '@/prisma';
import { sendMailInvalidPaymentProof } from '@/helpers/sendmail/invalid-payment-proof';
import { sendMailPaymentConfirmed } from '@/helpers/sendmail/payment-confirmed';
import { sendMailOrderSend } from '@/helpers/sendmail/order-send';
import { sendMailOrderDelivered } from '@/helpers/sendmail/order-delivered';
import { formatDate } from '@/utils/formatDate';
import { sendMailOrderCancel } from '@/helpers/sendmail/order-cancel';

export const updateTransactionStatusAction = async (
  statusId: number,
  id: string,
  reason: string,
) => {
  try {
    await prisma.$transaction(async (transaction: any) => {
      try {
        const transactionById: any =
          await getTransactionById(id);

        if (!transactionById) {
          logger.error(`transaction with id ${id} not found`);
          throw new Error(`transaction with id ${id} not found`);
        }

        if (statusId === 1) {
          const paymentProof = '';
          try {
            await updateTransactionPaymentProof(id, paymentProof, transaction);
            sendMailInvalidPaymentProof({
              user: transactionById?.user.username,
              orderId: id,
              to: transactionById?.user.email,
            });
          } catch (error) {
            logger.error(`update transaction with ${id} failed`);
            throw new Error(`update transaction with ${id} failed`);
          }
        }

        if (statusId === 3) {
          try {
            sendMailPaymentConfirmed({
              user: transactionById?.user.username,
              orderId: id,
              to: transactionById?.user.email,
            });
          } catch (error) {
            logger.error(`sendmail payment confirmed with ${id} failed`);
            throw new Error(`sendmail payment confirmed with ${id} failed`);
          }
        }

        if (statusId === 4) {
          try {
            sendMailOrderSend({
              user: transactionById?.user.username,
              orderId: id,
              to: transactionById?.user.email,
            });
          } catch (error) {
            logger.error(`sendmail order send with ${id} failed`);
            throw new Error(`sendmail order send with ${id} failed`);
          }

          schedule.scheduleJob(
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            async () => {
              try {
                if (transactionById?.statusId === 4) {
                  const statusOrderConfirm = 5;
                  await updateTransactionStatus(
                    id,
                    statusOrderConfirm,
                    transaction,
                  );

                  sendMailOrderDelivered({
                    user: transactionById?.user.username,
                    orderId: id,
                    to: transactionById?.user.email,
                  });
                }
              } catch (error) {
                logger.error(
                  `update status order confirm failed with transactionId ${id}`,
                );
                throw new Error(
                  `update status order confirm failed with transactionId ${id}`,
                );
              }
            },
          );
        }

        if (statusId === 5) {
          try {
            sendMailOrderDelivered({
              user: transactionById?.user.username,
              orderId: id,
              to: transactionById?.user.email,
            });
          } catch (error) {
            logger.error(`sendmail order delivered with ${id} failed`);
            throw new Error(`sendmail order delivered with ${id} failed`);
          }
        }

        if (statusId === 6) {
          try {
            const getStockMutation = await getStockMutationByOrderId(id);
            const getOrderItem = await getTransactionDetailByOrderId(id);

            const branchId: number = transactionById?.branchId as number;
            if (getStockMutation.length) {
              const stockproducts = getStockMutation;
              await returnStockById(stockproducts, transaction);

              for (const orderItem of getOrderItem) {
                const stockMutation = getStockMutation.find(
                  (mutation: any) => mutation.productId === orderItem.productId,
                );
                if (stockMutation) {
                  orderItem.quantity -= stockMutation.quantity;
                }
              }

              const products = getOrderItem;
              await returnStock(branchId, products, transaction);
            } else {
              const products = getOrderItem;
              await returnStock(branchId, products, transaction);
            }

            const createdAt = formatDate(new Date());

            const title = `The transaction with ID ${id} has been cancelled.`;
            const details = `Pada tanggal ${createdAt}, transaksi dengan ID ${id} telah dibatalkan. Pembatalan ini dilakukan karena ${reason}, `;

            await createJurnalHistory(branchId, title, details, transaction);

            sendMailOrderCancel({
              user: transactionById?.user.username,
              orderId: id,
              to: transactionById?.user.email,
            });
          } catch (error) {
            logger.info(`cancel order with id ${id} has failed`);
            throw new Error(`cancel order with id ${id} has failed`);
          }
        }

        await updateTransactionStatus(id, statusId, transaction);

        logger.info(`update transaction status with id ${id} was success`);
      } catch (error) {
        throw error;
      }
    });

    return {
      message: `update transaction status with id ${id} was success`,
      status: 200,
    };
  } catch (error) {
    throw error;
  }
};
