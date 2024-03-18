import { hashPassword } from '@/helpers/bcrypt';
import { getStoreByIdRepo } from '@/repositories/store/getStoreByIdRepo';
import { addStoreAdminRepo } from '@/repositories/storeAdmin/addStoreAdminRepo';
import { getStoreAdminByEmail } from '@/repositories/storeAdmin/getStoreAdminByEmail';
// import { IStoreAdmin } from '@/type.api/storeAdmin.type';

export const addStoreAdminAction = async (body: any) => {
  try {
    body.storeId = parseInt(String(body.storeId), 0);
    const store = await getStoreByIdRepo(body.storeId);
    const isExist = await getStoreAdminByEmail(body.email);
    // if (isExist) return { status: 400, message: 'Email Sudah ada' };
    // if (!store) return { status: 404, message: 'Store is not found' };

    body.password = await hashPassword(body.password);

    await addStoreAdminRepo(body);

    return {
      status: 200,
      message: 'Succes Add Store Admin',
    };
  } catch (error) {
    throw error;
  }
};
