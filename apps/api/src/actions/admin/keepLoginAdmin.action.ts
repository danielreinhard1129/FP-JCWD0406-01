import { excludeFields } from "@/helpers/excludeFields"
import { logger } from "@/logger"
import { findAdminByEmail } from "@/repositories/admin/findAdminByEmail"

export const keepLoginAdminAction = async (email: string) => {
    try {
        const admin = await findAdminByEmail(email)
        if(!admin) {
            logger.error(`Admin with ${email} not found`)
            return{
                status: 404,
                message: `Admin with ${email} not found`
            }
        }

        const dataWithoutPassword = excludeFields(admin, ["password"])

        logger.info(`keep login admin with email ${email} success`)
        return {
            status: 200,
            message: `keep login admin with email ${email} success`,
            data: dataWithoutPassword
        }
    } catch (error) {
        throw error
    }
}