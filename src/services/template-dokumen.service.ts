import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import ConflictedError from '@utils/exceptions/conflicted-error';
import NotFoundError from '@utils/exceptions/notfound-error';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  name?: string;
}
interface TemplateDokumenCreateDTO {
  code: string;
  name: string;
  template: string;
  status: any;
  created_by: number;
}
interface TemplateDokumenUpdateDTO extends Partial<TemplateDokumenCreateDTO> {
  updated_by: number;
}

class TemplateDokumenService {
  async findAll({ limit, page, name }: FindAllQueryParams) {
    const result = await prisma.templateDokumen.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        name: {
          contains: name,
        },
      },
    });

    const total = await prisma.templateDokumen.count({
      where: {
        name: {
          contains: name,
        },
      },
    });

    return {
      data: result,
      total,
    };
  }

  async findById(id: number) {
    const result = await prisma.templateDokumen.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: TemplateDokumenCreateDTO) {
    const isCodeExists = await prisma.templateDokumen.findFirst({
      where: {
        code: data.code,
      },
    });

    if (isCodeExists) {
      throw new ConflictedError('Code already exists');
    }

    const result = await prisma.templateDokumen.create({
      data: {
        code: data.code,
        name: data.name,
        template: data.template,
        status: data.status,
        created_by: data.created_by,
      },
    });

    return result;
  }

  async update(id: number, data: TemplateDokumenUpdateDTO) {
    const isExists = await prisma.templateDokumen.findFirst({
      where: {
        id: id,
      },
    });

    if (!isExists) {
      throw new NotFoundError('Data not found');
    }

    const result = await prisma.templateDokumen.update({
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
    const isExists = await prisma.templateDokumen.findFirst({
      where: {
        id: id,
      },
    });

    if (!isExists) {
      throw new NotFoundError('Data not found');
    }

    const result = await prisma.templateDokumen.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default TemplateDokumenService;
