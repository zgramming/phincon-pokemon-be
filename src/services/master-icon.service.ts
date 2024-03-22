import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import { kDirUploadMasterIcon } from '@utils/constant';
import NotFoundError from '@utils/exceptions/notfound-error';
import { generateUUID, moveFile } from '@utils/helpers';
import { prisma } from '@utils/prisma';
import formidable from 'formidable';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  name?: string;
}

interface MasterIconCreateDTO {
  name: string;
  code: string;
  status: any;
  icon: formidable.File;
  created_by: number;
}

interface MasterIconUpdateDTO extends Partial<MasterIconCreateDTO> {
  updated_by: number;
}

class MasterIconService {
  async findAll({ limit, page, name }: FindAllQueryParams) {
    const result = await prisma.appMasterIcon.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    const total = await prisma.appMasterIcon.count({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    return {
      result,
      total,
    };
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
    const transaction = await prisma.$transaction(async (trx) => {
      const result = await trx.appMasterIcon.create({
        data: {
          code: data.code,
          name: data.name,
          status: data.status,
          icon_url: data.icon.newFilename ?? '',
        },
      });
      moveFile(data.icon.filepath, `${kDirUploadMasterIcon}/${result.icon_url}`);
    });

    return transaction;
  }

  async update(id: number, data: MasterIconUpdateDTO) {
    const transaction = await prisma.$transaction(async (trx) => {
      const masterIcon = await trx.appMasterIcon.findUnique({
        where: {
          id,
        },
      });

      if (!masterIcon) {
        throw new NotFoundError('Master Icon not found');
      }

      const result = await trx.appMasterIcon.update({
        where: {
          id,
        },
        data: {
          ...data,
          icon_url: data.icon ? masterIcon.icon_url : undefined,
        },
      });

      if (data.icon) {
        moveFile(data.icon.filepath, `${kDirUploadMasterIcon}/${result.icon_url}`);
      }

      return result;
    });

    return transaction;
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
