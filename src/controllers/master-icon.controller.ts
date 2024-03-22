import MasterIconService from '@services/master-icon.service';
import { kDirUploadMasterIcon } from '@utils/constant';
import { generateUUID } from '@utils/helpers';
import { Request, Response } from 'express';
import formidable from 'formidable';

class MasterIconController {
  constructor(private masterIconService: MasterIconService) {}

  get = async (req: Request, res: Response) => {
    const query = req.query;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const name = query.name as string | undefined;

    const { result, total } = await this.masterIconService.findAll({
      page: Number(page),
      limit: Number(limit),
      name,
    });

    res
      .json({
        error: false,
        message: 'Master Icon list',
        total,
        data: result,
      })
      .status(200);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterIconService.findById(Number(id));

    res
      .json({
        error: false,
        message: 'Master Icon detail',
        data: result,
      })
      .status(200);
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;
    const form = formidable({
      uploadDir: kDirUploadMasterIcon,
      keepExtensions: true,
      filename(name, ext, part, form) {
        return `${generateUUID()}${ext}`;
      },
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res
          .json({
            error: true,
            message: 'Failed to upload icon',
            data: err,
          })
          .status(400);
      }

      data.icon = files.icon as any;

      const result = await this.masterIconService.create(data);
      res
        .json({
          error: false,
          message: 'Master Icon created',
          data: result,
        })
        .status(201);
    });
  };

  update = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;

    const result = await this.masterIconService.update(Number(id), data);

    res
      .json({
        error: false,
        message: 'Master Icon updated',
        data: result,
      })
      .status(200);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterIconService.delete(Number(id));

    res
      .json({
        error: false,
        message: 'Master Icon deleted',
        data: result,
      })
      .status(200);
  };
}

export default new MasterIconController(new MasterIconService());
