import { createJurnalHistory } from '@/repositories/jurnal/createJurnalHistory';
import { getStockMutationByOrderId } from '@/repositories/mutation/getStockMutationByOrderId';
import { returnStock } from '@/repositories/stock/returnStock';
import { returnStockById } from '@/repositories/stock/returnStockById';
import { getTransactionById } from '@/repositories/transaction/getTransactionById';
import { getTransactionDetailByOrderId } from '@/repositories/transaction/getTransactionDetailByOrderId';
import { updateTransactionPaymentProof } from '@/repositories/transaction/updateTransactionPaymentProof';
import { updateTransactionStatus } from '@/repositories/transaction/updateTransactionStatus';
import schedule from 'node-schedule';

export const updateTransactionStatusAction = async (
  statusId: number,
  transactionId: string,
  reason: string,
) => {
  try {
    if (statusId === 1) {
      const payment_proof = null;
      try {
        await updateTransactionPaymentProof(transactionId, payment_proof);
      } catch (error) {
        throw new Error('update transaction failled');
      }
    }

    if (statusId === 4) {
      schedule.scheduleJob(new Date(Date.now() + 1 * 60 * 1000), async () => {
        try {
          const status = await getTransactionById(transactionId);
          if (status?.statusId === 4) {
            const statusOrderConfirm = 5;
            await updateTransactionStatus(transactionId, statusOrderConfirm);
          }
        } catch (error) {
          throw new Error('update status order confirm failed');
        }
      });
    }

    if (statusId === 6) {
      try {
        const getTransaction = await getTransactionById(transactionId);
        if (!getTransaction) {
          throw new Error('transaction not found');
        }
        const getStockMutation = await getStockMutationByOrderId(transactionId);
        const getOrderItem = await getTransactionDetailByOrderId(transactionId);

        const branchId = getTransaction?.branchId;
        if (getStockMutation.length) {
          const stockproducts = getStockMutation;
          await returnStockById({ stockproducts });

          for (const orderItem of getOrderItem) {
            const stockMutation = getStockMutation.find(
              (mutation) => mutation.productId === orderItem.productId,
            );
            if (stockMutation) {
              orderItem.quantity -= stockMutation.qty;
            }
          }

          const products = getOrderItem;
          await returnStock({ branchId, products });
        } else {
          const products = getOrderItem;
          await returnStock({ branchId, products });
        }
        const transactionDate = new Date();
        const formatDate = transactionDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const monthName = formatDate.split(',')[0];
        const createdAt = `${transactionDate.getFullYear()} ${monthName}`;

        const notes = `The transaction with ID ${transactionId} has been cancelled.`;
        const details = `Pada tanggal ${createdAt}, transaksi dengan ID ${transactionId} telah dibatalkan. Pembatalan ini dilakukan karena ${reason}, `;
        await createJurnalHistory({ branchId, notes, details });
      } catch (error) {
        throw new Error('cancel order Failed');
      }
    }

    const result = await updateTransactionStatus(transactionId, statusId);
    return {
      message: 'update transaction status success',
      status: 200,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
