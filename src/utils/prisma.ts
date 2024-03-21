import { PrismaClient } from '@prisma/client';

export const isPrismaConnected = async () => {
  try {
    await prisma.$connect();
    console.log('Prisma connected');
  } catch (error) {
    console.error('Prisma connection error', error);
  }
};

export const prisma = new PrismaClient();
