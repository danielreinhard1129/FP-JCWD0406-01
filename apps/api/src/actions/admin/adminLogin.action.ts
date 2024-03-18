import { comparePasswords } from "@/helpers/bcrypt";
import { excludeFields } from "@/helpers/excludeFields";
import { createToken } from "@/helpers/jwt";
import { logger } from "@/logger";
import { findAdminByEmail } from "@/repositories/admin/findAdminByEmail";
import { findAdminByUsername } from "@/repositories/admin/findAdminByUsername";

export const LoginAdminAction = async (
    usernameOrEmail: string,
    password: string,
  ) => {
    try { 
      let admin;
  
      if (usernameOrEmail.includes('@')) {
        admin = await findAdminByEmail(usernameOrEmail);
      } else {
        admin = await findAdminByUsername(usernameOrEmail);
      }
  
      if (!admin) {
        logger.error(`${usernameOrEmail} not found`)
        return {
          status: 404,
          message: 'Account not found',
        };
      }
  
      const isPasswordValid = await comparePasswords(password, admin.password);
  
      if (!isPasswordValid) {
        logger.error(`${password} invalid`)
        return {
          status: 400,
          message: 'Invalid credentials',
        };
      }
  
      const dataWithoutPassword = excludeFields(admin, ['password']);
  
      const token = createToken({ email: admin.email });

      logger.info(`login admin success with usernameOrEmail ${usernameOrEmail}`)
  
      return {
        status: 200,
        message: `login admin success with usernameOrEmail ${usernameOrEmail}`,
        data: dataWithoutPassword,
        token,
      };
    } catch (error) {
      throw error;
    }
  };