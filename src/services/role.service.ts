import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import ConflictedError from '@utils/exceptions/conflicted-error';
import NotFoundError from '@utils/exceptions/notfound-error';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  name?: string;
}
interface RoleCreateDTO {
  code: string;
  name: string;
  status: any;
  created_by: number;
}
interface RoleUpdateDTO extends Partial<RoleCreateDTO> {
  updated_by: number;
}

class RoleService {
  async findAll({ limit, page, name }: FindAllQueryParams) {
    const result = await prisma.role.findMany({
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
    const result = await prisma.role.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: RoleCreateDTO) {
    const isCodeExists = await prisma.role.findFirst({
      where: {
        code: data.code,
      },
    });

    if (isCodeExists) {
      throw new ConflictedError('Role code already exists');
    }

    const result = await prisma.role.create({
      data: {
        ...data,
      },
    });

    return result;
  }

  async update(id: number, data: RoleUpdateDTO) {
    const isExists = await prisma.role.findFirst({
      where: {
        id: id,
      },
    });

    if (!isExists) {
      throw new NotFoundError('Role not found');
    }

    const codeExists = await prisma.role.findFirst({
      where: {
        code: data.code,
        id: {
          not: id,
        },
      },
    });

    if (codeExists) {
      throw new ConflictedError('Role code already exists');
    }

    const result = await prisma.role.update({
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
    const isExists = await prisma.role.findFirst({
      where: {
        id,
      },
    });

    if (!isExists) {
      throw new NotFoundError('Role not found');
    }

    const result = await prisma.role.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default RoleService;
