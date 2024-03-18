import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const createJurnalHistory = async (
  branchId: number,
  title: string,
  details: string,
  transaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) => {
  try {
    const prisma = transaction || new PrismaClient();

    const result = await prisma.journal.create({
      data: {
        branchId,
        title,
        reason: details,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
