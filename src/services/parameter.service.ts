import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import ConflictedError from '@utils/exceptions/conflicted-error';
import NotFoundError from '@utils/exceptions/notfound-error';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  name?: string;
}
interface ParameterCreateDTO {
  name: string;
  code: string;
  value: string;
  status: any;
  created_by: number;
}
interface ParameterUpdateDTO extends Partial<ParameterCreateDTO> {
  updated_by: number;
}

class ParameterService {
  async findAll({ limit, page, name }: FindAllQueryParams) {
    const result = await prisma.parameter.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        name: {
          contains: name,
        },
      },
    });

    return result;
  }

  async findById(id: number) {
    const result = await prisma.parameter.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: ParameterCreateDTO) {
    const isCodeExist = await prisma.parameter.findFirst({
      where: {
        code: data.code,
      },
    });

    if (isCodeExist) {
      throw new ConflictedError('Code already exist');
    }

    const result = await prisma.parameter.create({
      data: {
        ...data,
      },
    });

    return result;
  }

  async update(id: number, data: ParameterUpdateDTO) {
    const isCodeExist = await prisma.parameter.findFirst({
      where: {
        code: data.code,
        NOT: {
          id: id,
        },
      },
    });

    if (isCodeExist) {
      throw new ConflictedError('Code already exist');
    }

    const result = await prisma.parameter.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    return result;
  }

  async delete(id: number) {
    const isExist = await prisma.parameter.findFirst({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new NotFoundError('Parameter not found');
    }

    const result = await prisma.parameter.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default ParameterService;
