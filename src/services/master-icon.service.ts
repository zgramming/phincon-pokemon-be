import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {}

interface MasterIconCreateDTO {
  name: string;
  code: string;
  status: any;
  icon_url: string;
  created_by: number;
}

interface MasterIconUpdateDTO extends Partial<MasterIconCreateDTO> {
  updated_by: number;
}

class MasterIconService {
  async findAll({ limit, page }: FindAllQueryParams) {
    const result = await prisma.appMasterIcon.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });

    return result;
  }

  async findById(id: number) {
    const result = await prisma.appMasterIcon.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: MasterIconCreateDTO) {
    const result = await prisma.appMasterIcon.create({
      data: {
        ...data,
      },
    });

    return result;
  }

  async update(id: number, data: MasterIconUpdateDTO) {
    const result = await prisma.appMasterIcon.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return result;
  }

  async delete(id: number) {
    const result = await prisma.appMasterIcon.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default MasterIconService;
