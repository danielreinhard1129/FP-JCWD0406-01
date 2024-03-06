import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // const result = await prisma.store_Branch.create({
  //   data: {
  //     name: 'Serjon Store',
  //     latitude: 'dqdqd',
  //     longitude: 'dqdqw',
  //   },
  // });

  // -- store branch Data
  // name: "Jaya Store",
  //         adminId:1 ,
  //         latitude: "dqdqd",
  //         longitude: "dqdqw",

  // --order data
  // amount: 5,
  //         qty: 6,
  //         uuid: 'audhud7y66',
  //         address: "indonesia",
  //         branchId:1,
  //         customerId: 1,
  //         productId: 1,
  //         StatusId: 1

  //   const result = await prisma.status.create({
  //       data: {
  //           title: "waiting"
  //       }
  //   })

  //   const alice = await prisma.customer.create({
  //     data: {
  //       email: 'sdqd1',
  //       password: 'ffqfq',
  //       phone: '987676557',
  //       referralCode: 'qdqd',
  //       referrer: 'wdqd',
  //       username: 'saqdq',
  //       addressId: 1,
  //       profileId: 1,
  //     },
  //   });

  // console.log({ result });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
