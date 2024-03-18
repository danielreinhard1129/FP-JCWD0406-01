import { createTransaction } from '@/repositories/transaction/createTransaction';
import { createTransactionItems } from '@/repositories/transaction/createTransactionItems';
import { nanoid } from 'nanoid';
import { getUserById } from '@/repositories/user/getUserById';
import schedule from 'node-schedule';
import { updateTransactionStatus } from '@/repositories/transaction/updateTransactionStatus';
import { getTransactionById } from '@/repositories/transaction/getTransactionById';
import { getStocksByProductIdAndBranchId } from '@/repositories/stock/getStocksByProductIdAndBranchId';
import { getStocksByProductId } from '@/repositories/stock/getStocksByProductId';
import { getBranchById } from '@/repositories/branchs/getBranchById';
import { getBranchesExcluding } from '@/repositories/branchs/getBranchesExcluding';
import { updateStockDecrementByProductIdAndBranchId } from '@/repositories/stock/updateStockDecrementByProductIdAndBranchId';
import { updateStockByProductIdAndBranchId } from '@/repositories/stock/updateStockByProductIdAndBranchId';
import { updateReturnStockByProductIdAndBranchId } from '@/repositories/stock/updateReturnStockByProductIdAndBranchId';
import { updateStockIncrementByProductIdAndBranchId } from '@/repositories/stock/updateStockIncrementByProductIdAndBranchId';
import { createMutationStock } from '@/repositories/mutation/createMutationStock';
import {
  MIDTRANS_SERVER_KEY,
  MIDTRANS_APP_URL,
  FRONT_END_URL,
} from '@/utils/constant';

interface IBody {
  products: any;
  address: string;
  amount: number;
  userId: number;
  message: string;
  branchId: number;
}

export const createTransactionAction = async (body: IBody) => {
  try {
    const { products, address, amount, userId, message, branchId } = body;

    if (!products.length)
      throw new Error(
        "Oops, the product you entered is not in the checkout page. Make sure it's in your cart before proceeding.",
      );

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

    products.forEach((request: any) => {
      const productId = request.id;
      const requestedQuantity = request.quantity;

      if (!totalStock[productId] || totalStock[productId] < requestedQuantity) {
        isRequestFulfilled = false;
      }
    });

    if (!isRequestFulfilled)
      throw new Error("Sorry, we don't have enough in stock for your order");

    const productsFromDB = await getStocksByProductIdAndBranchId({
      products,
      branchId,
    });

    const BeforeChange = productsFromDB;

    if (productsFromDB.length === 0) throw new Error('Products not found');

    function checkAndProcessOrder({ products, productsFromDB }: any) {
      let insufficientProducts = [];

      for (const req of products) {
        const productInDB = productsFromDB.find(
          (p: any) => p.productId === req.id,
        );

        if (productInDB) {
          if (productInDB.amount >= req.quantity) {
            productInDB.amount -= req.quantity;
          } else {
            const shortfall = req.quantity - productInDB.amount;
            productInDB.amount = 0;

            insufficientProducts.push({
              id: req.id,
              productName: productInDB.product.name,
              quantity: shortfall,
            });
          }
        } else {
          throw new Error(
            `Product with ID ${req.id} not found in the database.`,
          );
        }
      }

      return { insufficientProducts, productsFromDB };
    }

    const nearestBranch = checkAndProcessOrder({ products, productsFromDB });

    function haversine(lat1: any, lon1: any, lat2: any, lon2: any) {
      const R = 6371.0;

      const [radLat1, radLon1, radLat2, radLon2] = [lat1, lon1, lat2, lon2].map(
        (coord) => (coord * Math.PI) / 180,
      );

      const dlat = radLat2 - radLat1;
      const dlon = radLon2 - radLon1;

      const a =
        Math.sin(dlat / 2) ** 2 +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dlon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c;

      return distance;
    }

    function FindNearestBranch(
      userLat: any,
      userLon: any,
      listOfBranches: any,
    ) {
      let nearestBranch = null;
      let closestDistance = Infinity;

      for (const branch of listOfBranches) {
        const branchLat = Number(branch.latitude);
        const branchLon = Number(branch.longitude);

        const distance = haversine(userLat, userLon, branchLat, branchLon);

        if (distance < closestDistance) {
          closestDistance = distance;
          nearestBranch = branch;
        }
      }

      const distance = closestDistance.toFixed(2);
      return { nearestBranch, distance };
    }

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

      function isStockSufficient({ stockShortages, stockNearestBranch }: any) {
        for (const stockShortage of stockShortages) {
          const stockItem = stockNearestBranch.find(
            (item: any) => item.productId === stockShortage.id,
          );

          if (!stockItem || stockItem.amount < stockShortage.quantity) {
            return false;
          }
        }
        return true;
      }

      const isStockEnough = isStockSufficient({
        stockShortages: nearestBranch?.insufficientProducts,
        stockNearestBranch: checkstockNearestBranch,
      });
      if (!isStockEnough) throw new Error('Product stock is not enough');

      lendingStore = await updateStockDecrementByProductIdAndBranchId({
        branchId: closestBranch?.nearestBranch?.id,
        products: nearestBranch?.insufficientProducts,
      });
    }

    const decrementStock = await updateStockByProductIdAndBranchId({
      products: nearestBranch?.productsFromDB,
    });

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

    productsFromDB.forEach((product) => {
      const productFromRequest = products.find(
        (productFromRequest: any) =>
          productFromRequest.id === product.productId,
      );
      product.amount = productFromRequest.quantity;
    });

    const transactionId = `GRC-${nanoid(4)}-${nanoid(3)}`;
    const statusId = 1;

    const user: any = await getUserById(userId);

    const authString = btoa(`${MIDTRANS_SERVER_KEY}:`);

    const mutationStock = await createMutationStock({
      transactionId,
      stocks: getStockLendingStore,
    });

    const payload = {
      transaction_details: {
        order_id: transactionId,
        gross_amount: amount,
      },
      items_details: productsFromDB.map((product) => ({
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
        finish: `${FRONT_END_URL}/order_status/?transaction_id=${transactionId}`,
        error: `${FRONT_END_URL}/order_status/?transaction_id=${transactionId}`,
        pending: `${FRONT_END_URL}/order_status/?transaction_id=${transactionId}`,
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

    if (response.status !== 201) {
      throw new Error('Failed to create transactions');
    }

    const snapToken = data.token;
    const snapRedirectUrl = data.redirect_url;

    const transaction = await createTransaction(
      transactionId,
      branchId,
      amount,
      statusId,
      address,
      userId,
      snapToken,
      snapRedirectUrl,
      message,
    );
    const transactionItems = await createTransactionItems({
      products: productsFromDB,
      transactionId,
    });

    function reduceStockFromBorrowed({ BeforeChange, borrowedProducts }: any) {
      borrowedProducts.forEach((borrowedProduct: any) => {
        const indeksProdukExisting = BeforeChange.findIndex(
          (item: any) => item.productId === borrowedProduct.id,
        );

        if (indeksProdukExisting !== -1) {
          BeforeChange[indeksProdukExisting].amount -= borrowedProduct.quantity;

          if (BeforeChange[indeksProdukExisting].amount < 0) {
            BeforeChange[indeksProdukExisting].amount = 0;
          }
        }
      });

      return BeforeChange;
    }

    const beforeAddTerupdate = reduceStockFromBorrowed({
      BeforeChange,
      borrowedProducts: nearestBranch?.insufficientProducts,
    });

    schedule.scheduleJob(new Date(Date.now() + 1 * 60 * 1000), async () => {
      const statusId = 6;
      const status = await getTransactionById(transaction.orderId);

      if (status?.statusId === 1) {
        await updateTransactionStatus(transaction.orderId, statusId);

        const returnStock = updateReturnStockByProductIdAndBranchId({
          products: beforeAddTerupdate,
        });

        const returnStockByNearestBranch =
          await updateStockIncrementByProductIdAndBranchId({
            branchId: closestBranch?.nearestBranch?.id,
            products: nearestBranch?.insufficientProducts,
          });
      }
    });

    return {
      message: 'create Transaction success',
      status: 200,
      transaction,
      transactionItems,
    };
  } catch (error) {
    throw error;
  }
};
