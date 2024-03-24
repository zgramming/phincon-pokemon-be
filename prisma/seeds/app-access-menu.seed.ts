import { availableAccessAction } from '@utils/constant';
import { prisma } from '@utils/prisma';

export const AppAccessMenuSeeder = async () => {
  const role = await prisma.role.findMany();

  const menuForUser = await prisma.appMenu.findMany({
    where: {
      app_modul: {
        code: {
          in: ['MAIN-MENU-USER'],
        },
      },
    },
  });

  const menuForManager = await prisma.appMenu.findMany({
    where: {
      app_modul: {
        code: {
          in: ['MAIN-MENU-MANAGER'],
        },
      },
    },
  });

  const menuForSuperadmin = await prisma.appMenu.findMany({
    where: {
      app_modul: {
        code: {
          in: ['SYSTEM-SETTING'],
        },
      },
    },
  });

  const result = await prisma.appAccessMenu.createMany({
    data: [
      // USER

      ...menuForUser.map((val) => ({
        app_category_modul_id: val.app_category_modul_id,
        role_id: role.find((v) => v.code === 'user')?.id || 0,
        app_menu_id: val.id,
        app_modul_id: val.app_modul_id,
        permissions: availableAccessAction,
      })),

      // MANAGER
      ...menuForManager.map((val) => ({
        app_category_modul_id: val.app_category_modul_id,
        role_id: role.find((v) => v.code === 'manager')?.id || 0,
        app_menu_id: val.id,
        app_modul_id: val.app_modul_id,
        permissions: availableAccessAction,
      })),

      // SUPERADMIN
      ...menuForSuperadmin.map((val) => ({
        app_category_modul_id: val.app_category_modul_id,
        role_id: role.find((v) => v.code === 'superadmin')?.id || 0,
        app_menu_id: val.id,
        app_modul_id: val.app_modul_id,
        permissions: availableAccessAction,
      })),
    ],
  });

  console.log({
    result,
    message: 'AppAccessMenuSeeder done!',
  });
};
