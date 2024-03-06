import { getStoreAdminByIdRepo } from "@/repositories/storeAdmin/getStoreAdminByIdRepo"
import { updateStoreAdminRepo } from "@/repositories/storeAdmin/updateStoreAdminRepo"
import { IStoreAdmin } from "@/type.api/storeAdmin.type"

export const updateStoreAdminAction = async (id:number,body:IStoreAdmin) => {
  try {

    const isExist = await getStoreAdminByIdRepo(id)
    
    if(!isExist) return {status:404, message: "Admin is not found"}

    await updateStoreAdminRepo(id,body)
    
    return {
        status: 200,
        message: "Succes Update data"
    }
  } catch (error) {
    throw error
  }
}
