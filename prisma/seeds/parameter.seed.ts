import { prisma } from '@utils/prisma';

export const ParameterSeeder = async () => {
  await prisma.parameter.deleteMany();
  const parameters = await prisma.parameter.createMany({
    data: [
      {
        code: 'VERSION_APP',
        value: '1.0.0',
        name: 'Version App',
      },
    ],
  });
  console.log({
    message: 'Parameter seed completed',
    data: parameters,
  });
};
