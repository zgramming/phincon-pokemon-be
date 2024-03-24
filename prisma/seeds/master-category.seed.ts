import { prisma } from '@utils/prisma';

export const MasterCategorySeeder = async () => {
  await prisma.masterCategory.deleteMany();

  const result = await prisma.masterCategory.createMany({
    data: [
      {
        code: 'PROVINCE',
        name: 'Province',
      },
    ],
  });

  console.log({
    message: 'Master category seed completed',
    data: result,
  });
};
