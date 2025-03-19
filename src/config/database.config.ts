import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Database Connection Successful");
  } catch (error) {
    console.log("Error in connecting Database", error);
  }
};
