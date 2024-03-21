import { prisma } from '@utils/prisma';

export const AppMenuSeeder = async () => {
  await prisma.appMenu.deleteMany();

  const categoryModul = await prisma.appCategoryModul.findMany();
  const modul = await prisma.appModul.findMany();

  const result = await prisma.appMenu.createMany({
    data: [
      // User
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'MAIN-MENU')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'MAIN-MENU-USER')?.id || 0,
        code: 'MAIN-MENU-USER-DASHBOARD',
        name: 'Dashboard',
        route: '/apps/user/dashboard',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'MAIN-MENU')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'MAIN-MENU-USER')?.id || 0,
        code: 'MAIN-MENU-USER-PROFILE',
        name: 'Profile',
        route: '/apps/user/profile',
      },

      // Manager
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'MAIN-MENU')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'MAIN-MENU-MANAGER')?.id || 0,
        code: 'MAIN-MENU-MANAGER-DASHBOARD',
        name: 'Dashboard',
        route: '/apps/manager/dashboard',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'MAIN-MENU')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'MAIN-MENU-MANAGER')?.id || 0,
        code: 'MAIN-MENU-MANAGER-MEEETING',
        name: 'Meeting',
        route: '/apps/manager/meeting',
      },

      // Setting
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'SYSTEM')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'SYSTEM-SETTING')?.id || 0,
        code: 'SYSTEM-SETTING-ROLE',
        name: 'Role',
        route: '/system/setting/role',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'SYSTEM')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'SYSTEM-SETTING')?.id || 0,
        code: 'SYSTEM-SETTING-USER',
        name: 'User',
        route: '/system/setting/user',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'SYSTEM')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'SYSTEM-SETTING')?.id || 0,
        code: 'SYSTEM-SETTING-CATEGORY-MODUL',
        name: 'Category Modul',
        route: '/system/setting/category-modul',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'SYSTEM')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'SYSTEM-SETTING')?.id || 0,
        code: 'SYSTEM-SETTING-MODUL',
        name: 'Modul',
        route: '/system/setting/modul',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'SYSTEM')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'SYSTEM-SETTING')?.id || 0,
        code: 'SYSTEM-SETTING-MENU',
        name: 'Menu',
        route: '/system/setting/menu',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'SYSTEM')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'SYSTEM-SETTING')?.id || 0,
        code: 'SYSTEM-SETTING-ACCESS-MODUL',
        name: 'Access Modul',
        route: '/system/setting/access-modul',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'SYSTEM')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'SYSTEM-SETTING')?.id || 0,
        code: 'SYSTEM-SETTING-ACCESS-MENU',
        name: 'Access Menu',
        route: '/system/setting/access-menu',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'SYSTEM')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'SYSTEM-SETTING')?.id || 0,
        code: 'SYSTEM-SETTING-MASTER-CATEGORY',
        name: 'Master Category',
        route: '/system/setting/master-category',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'SYSTEM')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'SYSTEM-SETTING')?.id || 0,
        code: 'SYSTEM-SETTING-MASTER-DATA',
        name: 'Master Data',
        route: '/system/setting/master-data',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'SYSTEM')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'SYSTEM-SETTING')?.id || 0,
        code: 'SYSTEM-SETTING-MASTER-ICON',
        name: 'Master Icon',
        route: '/system/setting/master-icon',
      },
      {
        app_category_modul_id: categoryModul.find((val) => val.code === 'SYSTEM')?.id || 0,
        app_modul_id: modul.find((val) => val.code === 'SYSTEM-SETTING')?.id || 0,
        code: 'SYSTEM-SETTING-PARAMETER',
        name: 'Parameter',
        route: '/system/setting/parameter',
      },
    ],
  });

  console.log({
    message: 'AppMenu seed completed',
    data: result,
  });
};
