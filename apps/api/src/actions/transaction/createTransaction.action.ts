import { createTransaction } from '@/repositories/transaction/createTransaction';
import { createTransactionItems } from '@/repositories/transaction/createTransactionItems';
import { nanoid } from 'nanoid';
import { getUserById } from '@/repositories/user/getUserById';
import schedule from 'node-schedule';
import { updateTransactionStatus } from '@/repositories/transaction/updateTransactionStatus';
import { getTransactionById } from '@/repositories/transaction/getTransactionById';
import { getBranchById } from '@/repositories/branchs/getBranchById';
import { getBranchesExcluding } from '@/repositories/branchs/getBranchesExcluding';
import { createMutationStock } from '@/repositories/mutation/createMutationStock';
import { getStocksByProductId } from '@/repositories/Stock/getStocksByProductId';
import { getStocksByProductIdAndBranchId } from '@/repositories/Stock/getStocksByProductIdAndBranchId';
import { updateStockDecrementByProductIdAndBranchId } from '@/repositories/Stock/updateStockDecrementByProductIdAndBranchId';
import { updateStockByProductIdAndBranchId } from '@/repositories/Stock/updateStockByProductIdAndBranchId';
import { updateReturnStockByProductIdAndBranchId } from '@/repositories/Stock/updateReturnStockByProductIdAndBranchId';
import { updateStockIncrementByProductIdAndBranchId } from '@/repositories/Stock/updateStockIncrementByProductIdAndBranchId';
import {
  MIDTRANS_SERVER_KEY,
  MIDTRANS_APP_URL,
  FRONT_END_URL,
} from '@/utils/constant';
import { logger } from '@/logger';
import prisma from '@/prisma';
import { ICreateTransactionParams } from '@/types/params.type';
import { IProductDB, IProductRequest } from '@/types/product.type';
import { sendMailPaymentReceivedVerification } from '@/helpers/sendmail/payment-received-verification';
import { sendMailOrderCancel } from '@/helpers/sendmail/order-cancel';
import { FindNearestBranch } from '@/helpers/findNearestBranch';
import { checkAndProcessOrder } from '@/helpers/checkAndProcessOrder';
import { reduceStockFromBorrowed } from '@/helpers/reduceStockFromBorrowed';
import { isStockSufficient } from '@/helpers/isStockSufficient';
import { IUser } from '@/types/user.type';

export const createTransactionAction = async (
  body: ICreateTransactionParams,
) => {
  try {
    const transaction = await prisma.$transaction(async (transaction) => {
      const { products, address, amount, userId, message, branchId } = body;

      if (!products.length) {
        logger.error('the checked-out product was not found');
        throw new Error('the checked-out product was not found');
      }
      const getProducts = await getStocksByProductId({ products });

      const totalStock: any = {};

      getProducts.forEach((item) => {
        if (totalStock[item.productId]) {
          totalStock[item.productId] += item.amount;
        } else {
          totalStock[item.productId] = item.amount;
        }
      });

      let isRequestFulfilled = true;

      products.forEach((request: IProductRequest) => {
        const productId: number = request.id;
        const requestedQuantity: number = request.quantity;

        if (
          !totalStock[productId] ||
          totalStock[productId] < requestedQuantity
        ) {
          isRequestFulfilled = false;
        }
      });

      if (!isRequestFulfilled) {
        logger.error("Sorry, we don't have enough in stock for your order");
        throw new Error("Sorry, we don't have enough in stock for your order");
      }

      const productsFromDB: any = await getStocksByProductIdAndBranchId({
        products,
        branchId,
      });

      const BeforeChange = productsFromDB;

      if (!productsFromDB) {
        logger.error('Products not found');
        throw new Error('Products not found');
      }

      const nearestBranch = checkAndProcessOrder({ products, productsFromDB });

      const getBranch = await getBranchById(branchId);
      const getBranchAll = await getBranchesExcluding(branchId);

      const branchLatitude = Number(getBranch?.latitude);
      const branchLongitude = Number(getBranch?.longitude);

      let closestBranch: any;
      let lendingStore;

      if (nearestBranch?.insufficientProducts.length > 0) {
        closestBranch = FindNearestBranch(
          branchLatitude,
          branchLongitude,
          getBranchAll,
        );

        const checkstockNearestBranch = await getStocksByProductIdAndBranchId({
          products: nearestBranch?.insufficientProducts,
          branchId: closestBranch?.nearestBranch?.id,
        });

        const isStockEnough = isStockSufficient({
          stockShortages: nearestBranch?.insufficientProducts,
          stockNearestBranch: checkstockNearestBranch,
        });
        if (!isStockEnough) {
          logger.error('product stock is not enough');
          throw new Error('product stock is not enough');
        }

        lendingStore = await updateStockDecrementByProductIdAndBranchId(
          closestBranch?.nearestBranch?.id,
          nearestBranch?.insufficientProducts,
          transaction,
        );
      }

      const decrementStock = await updateStockByProductIdAndBranchId(
        nearestBranch?.productsFromDB,
        transaction,
      );

      const getStockLendingStore = await getStocksByProductIdAndBranchId({
        products: nearestBranch?.insufficientProducts,
        branchId: closestBranch?.nearestBranch?.id,
      });

      nearestBranch?.insufficientProducts.forEach((item) => {
        const { id, quantity } = item;
        const stockItem = getStockLendingStore.find(
          (item) => item.productId === id,
        );

        if (stockItem) {
          stockItem.amount = quantity;
        }
      });

      productsFromDB.forEach((product: IProductDB) => {
        const productFromRequest = products.find(
          (productFromRequest: IProductRequest) =>
            productFromRequest.id === product.productId,
        );
        product.amount = productFromRequest?.quantity as number;
      });

      const transactionId = `GRC-${nanoid(4)}-${nanoid(3)}`;
      const statusId = 1;

      const user: IUser = (await getUserById(userId)) as IUser;

      const authString = btoa(`${MIDTRANS_SERVER_KEY}:`);

      const mutationStock = await createMutationStock(
        transactionId,
        getStockLendingStore,
        transaction,
      );

      const payload = {
        transaction_details: {
          order_id: transactionId,
          gross_amount: amount,
        },
        items_details: productsFromDB.map((product: IProductDB) => ({
          id: product?.product?.id,
          price: product?.product?.price,
          quantity: product?.amount,
          name: product?.product?.name,
        })),
        customer_details: {
          first_name: user?.username,
          email: user?.email,
          phone: user?.phone,
        },
        callback: {
          finish: `${FRONT_END_URL}/order-status/?transaction_id=${transactionId}`,
          error: `${FRONT_END_URL}/order-status/?transaction_id=${transactionId}`,
          pending: `${FRONT_END_URL}/order-status/?transaction_id=${transactionId}`,
        },
      };

      const response = await fetch(`${MIDTRANS_APP_URL}/snap/v1/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response?.status !== 201) {
        logger.error(`failed to create transactions with id ${transactionId}`);
        throw new Error(
          `failed to create transactions with id ${transactionId}`,
        );
      }

      const snapToken = data?.token;
      const snapRedirectUrl = data?.redirect_url;

      const createNewTransaction = await createTransaction(
        transactionId,
        branchId,
        amount,
        statusId,
        address,
        userId,
        snapToken,
        snapRedirectUrl,
        message,
        transaction,
      );

      const transactionItems = await createTransactionItems(
        productsFromDB,
        transactionId,
        transaction,
      );

      sendMailPaymentReceivedVerification({
        user: user?.username,
        orderId: transactionId,
        to: user?.email,
      });

      const beforeAddTerupdate = reduceStockFromBorrowed({
        BeforeChange,
        borrowedProducts: nearestBranch?.insufficientProducts,
      });

      schedule.scheduleJob(new Date(Date.now() + 60 * 60 * 1000), async () => {
        const statusId = 6;
        const status = await getTransactionById(createNewTransaction.orderId);

        if (status?.statusId === 1) {
          await updateTransactionStatus(
            createNewTransaction.orderId,
            statusId,
            transaction,
          );

          const returnStock = updateReturnStockByProductIdAndBranchId(
            beforeAddTerupdate,
            transaction,
          );

          const returnStockByNearestBranch =
            await updateStockIncrementByProductIdAndBranchId(
              closestBranch?.nearestBranch?.id,
              nearestBranch?.insufficientProducts,
              transaction,
            );

          sendMailOrderCancel({
            user: user?.username,
            orderId: createNewTransaction?.orderId,
            to: user?.email,
          });
        }
      });

      logger.info(`create transaction with id ${transactionId} was success`);

      return { createNewTransaction, transactionItems };
    });

    return {
      message: `create transaction success`,
      status: 200,
      transaction: transaction?.createNewTransaction,
      transactionItems: transaction?.transactionItems,
    };
  } catch (error) {
    throw error;
  }
};
