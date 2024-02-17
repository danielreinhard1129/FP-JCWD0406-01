import { getProductsByIds } from "@/repositories/product/getProductsByIds";
import { createTransaction } from "@/repositories/transaction/createTransaction";
import { createTransactionItems } from "@/repositories/transaction/createTransactionItems";
import { nanoid } from 'nanoid'

interface IBody {
    products: any
    address: string
    amount: number
    customerId: number
    branchId: number
}

export const createTransactionAction = async (body: IBody) => {
  try {
    const {products, address, amount, customerId, branchId} = body

    const findProducts = await getProductsByIds({products})
    
    if(findProducts.length === 0) throw new Error("Products not found")
    
    findProducts.forEach((product) => {
      const productFromRequest = products.find((productFromRequest: any) => productFromRequest.id === product.product.id)
      product.amount = productFromRequest.quantity
    })

    const transactionId = `OGWA-${nanoid(4)}-${nanoid(4)}`;
    
    const statusId = 1
    
    // const transaction = await createTransaction(transactionId, amount, statusId, address, customerId, branchId);

    const transactionItems = await createTransactionItems({products: findProducts, transactionId})

    return {
      message: 'create Transaction success',
      status: 200,
      data: { transactionItems}
    };
  } catch (error) {
    throw error;
  }
};