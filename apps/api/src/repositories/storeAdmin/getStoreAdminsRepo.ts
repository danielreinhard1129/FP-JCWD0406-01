import { prisma } from '@/helper/prisma';

export const getStoreAdminRepo = async () => {
  try {
    const result = await prisma.admin.findMany({
        where: {
            isSuper : false
        },
        select:{
            id:true,
            email: true,
            name:true,        
            store_branch: true,
            storeId: true
        }
    });
    return result;
  } catch (error) {
    throw error
  }
};
