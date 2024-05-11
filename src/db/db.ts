import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare global {
//   var db: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const db = globalThis.db ?? prismaClientSingleton();

// export default db;

// if (process.env.NODE_ENV !== "production") {
//   globalThis.db = db;
// }

// declare global {
//     var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

// if (process.env.NODE_ENV !== "production") {
//     globalThis.prisma = prisma;
// }
