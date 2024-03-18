import { deleteCategoryRepo } from "@/repositories/categories/deleteCategoryRepo"
import { findCategoryByIdRepo } from "@/repositories/categories/findCategoryByIdRepo"

export async function deleteCategoryAction(id:number) {
    try {
        const isExist = await findCategoryByIdRepo(id)
        if(!isExist) return {status: 404, message: "Category is not found"}
        await deleteCategoryRepo(id)
        return {status: 200, message: "Success delete category"}
    } catch (error) {
        throw error
    }
}