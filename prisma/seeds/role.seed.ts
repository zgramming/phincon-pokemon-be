import { prisma } from '@utils/prisma';

export const RoleSeeder = async () => {
  await prisma.role.deleteMany();
  const roles = await prisma.role.createMany({
    data: [
      {
        code: 'superadmin',
        name: 'Superadmin',
      },
      {
        code: 'user',
        name: 'User',
      },
      {
        code: 'manager',
        name: 'Manager',
      },
    ],
  });
  console.log({
    message: 'Role seed completed',
    data: roles,
  });
};
