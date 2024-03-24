import { prisma } from '@utils/prisma';

export const AppModulSeeder = async () => {
  await prisma.appModul.deleteMany();

  const categoryModul = await prisma.appCategoryModul.findMany();
  const appModuls = await prisma.appModul.createMany({
    data: [
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'MAIN-MENU')?.id || 0,
        code: 'MAIN-MENU-USER',
        name: 'User',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'MAIN-MENU')?.id || 0,
        code: 'MAIN-MENU-MANAGER',
        name: 'Manager',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'SYSTEM')?.id || 0,
        code: 'SYSTEM-SETTING',
        name: 'Setting',
      },
    ],
  });

  console.log({
    message: 'AppModul seed completed',
    data: appModuls,
  });
};
