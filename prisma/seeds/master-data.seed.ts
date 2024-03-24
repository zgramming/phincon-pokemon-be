import { prisma } from '@utils/prisma';

export const MasterDataSeeder = async () => {
  await prisma.masterData.deleteMany();
  const masterCategories = await prisma.masterCategory.findMany();
  const province = masterCategories.find((item) => item.code === 'PROVINCE');
  const result = await prisma.masterData.createMany({
    data: [
      {
        master_category_id: province ? province.id : 0,
        master_category_code: province ? province.code : '',
        code: 'PROVINCE_JKT',
        name: 'Jakarta',
      },
    ],
  });

  console.log({
    message: 'Master data seed completed',
    data: result,
  });
};
