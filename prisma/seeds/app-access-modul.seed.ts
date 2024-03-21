import { prisma } from '@utils/prisma';

export const AppAccessModulSeeder = async () => {
  await prisma.appAccessModul.deleteMany();

  const role = await prisma.role.findMany();

  const modulForUser = await prisma.appModul.findMany({
    where: {
      code: {
        in: ['MAIN-MENU-USER'],
      },
    },
  });

  const modulForManager = await prisma.appModul.findMany({
    where: {
      code: {
        in: ['MAIN-MENU-MANAGER'],
      },
    },
  });

  const modulForSuperadmin = await prisma.appModul.findMany({
    where: {
      code: {
        in: ['SYSTEM-SETTING'],
      },
    },
  });

  const result = await prisma.appAccessModul.createMany({
    data: [
      // USER
      ...modulForUser.map((val) => ({
        app_category_modul_id: val.app_category_modul_id,
        role_id: role.find((v) => v.code === 'user')?.id || 0,
        app_modul_id: val.id,
      })),

      // MANAGER
      ...modulForManager.map((val) => ({
        app_category_modul_id: val.app_category_modul_id,
        role_id: role.find((v) => v.code === 'manager')?.id || 0,
        app_modul_id: val.id,
      })),

      // SUPERADMIN
      ...modulForSuperadmin.map((val) => ({
        app_category_modul_id: val.app_category_modul_id,
        role_id: role.find((v) => v.code === 'superadmin')?.id || 0,
        app_modul_id: val.id,
      })),
    ],
  });

  console.log({
    result,
    message: 'AppAccessModulSeeder done!',
  });
};
