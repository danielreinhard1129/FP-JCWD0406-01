import { getTotalTransactionsByBranchId } from '@/repositories/transaction/getTotalTransactionsByBranchId';
import { getTransactionsByBranchId } from '@/repositories/transaction/getTransactionsByBranchId';

export const getTransactionsByBranchIdAction = async (
  branchId: number,
  page: number,
  perPage: number,
) => {
  try {
    const skip = (page - 1) * perPage;
    const result = await getTransactionsByBranchId(branchId, skip, perPage);
    const getTotalTransactions = await getTotalTransactionsByBranchId(branchId);

    return {
      message: 'get transaction by branch id success',
      status: 200,
      data: result,
      total: getTotalTransactions,
    };
  } catch (error) {
    throw error;
  }
};
