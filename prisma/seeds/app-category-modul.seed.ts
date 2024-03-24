import { prisma } from '@utils/prisma';

export const AppCategoryModulSeeder = async () => {
  await prisma.appCategoryModul.deleteMany();

  const appCategoryModuls = await prisma.appCategoryModul.createMany({
    data: [
      {
        code: 'MAIN-MENU',
        name: 'Main Menu',
        order: 1,
      },
      {
        code: 'SYSTEM',
        name: 'System',
        order: 2,
      },
    ],
  });

  console.log({
    message: 'AppCategoryModul seed completed',
    data: appCategoryModuls,
  });
};
