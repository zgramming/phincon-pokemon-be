import { RoleSeeder } from './role.seed';
import { UserSeeder } from './user.seed';
import { AppCategoryModulSeeder } from './app-category-modul.seed';
import { AppModulSeeder } from './app-modul.seed';
import { AppMenuSeeder } from './app-menu.seed';
import { AppAccessModulSeeder } from './app-access-modul.seed';
import { AppAccessMenuSeeder } from './app-access-menu.seed';
import { ParameterSeeder } from './parameter.seed';

const main = async () => {
  await RoleSeeder();
  await UserSeeder();
  await AppCategoryModulSeeder();
  await AppModulSeeder();
  await AppMenuSeeder();
  await AppAccessModulSeeder();
  await AppAccessMenuSeeder();
  await ParameterSeeder();
};

main();
