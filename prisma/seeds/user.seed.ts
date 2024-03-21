import { prisma } from '@utils/prisma';
import { hashSync } from 'bcrypt';

export const UserSeeder = async () => {
  await prisma.users.deleteMany();

  const roles = await prisma.role.findMany();
  const users = await prisma.users.createMany({
    data: [
      {
        name: 'Superadmin',
        role_id: roles.find((role) => role.code === 'superadmin')?.id || 0,
        username: 'superadmin',
        password: hashSync('123', 10),
      },
      {
        name: 'User',
        role_id: roles.find((role) => role.code === 'user')?.id || 0,
        username: 'user',
        password: hashSync('123', 10),
      },
      {
        name: 'Manager',
        role_id: roles.find((role) => role.code === 'manager')?.id || 0,
        username: 'manager',
        password: hashSync('123', 10),
      },
    ],
  });

  console.log({
    message: 'User seed completed',
    data: users,
  });
};
