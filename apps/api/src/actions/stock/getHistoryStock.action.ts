// import { getHistoriesStockRepo } from "@/repositories/Stock/getHistoriesStockRepo"

export const getHistoryStockAction =  async(id: number,
    startDate: string,
    endDate: string,
    categoryId: number = 0,
    search: string,) => {
  try {
    // const data = await getHistoriesStockRepo(id,startDate,endDate,categoryId,search)

    return {
        status:200,
        message: "Succes Get data",
        // data
    }
  } catch (error) {
    throw error
  }
}
