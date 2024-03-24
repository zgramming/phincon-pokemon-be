import TemplateDokumenService from '@services/template-dokumen.service';
import { Request, Response } from 'express';

class TemplateDokumenController {
  constructor(private templateDokumenService: TemplateDokumenService) {}

  get = async (req: Request, res: Response) => {
    const query = req.query;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const name = query.name as string | undefined;

    const { data: result, total } = await this.templateDokumenService.findAll({
      page: Number(page),
      limit: Number(limit),
      name,
    });

    res
      .json({
        error: false,
        message: 'Template Dokumen list',
        data: result,
        total,
      })
      .status(200);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.templateDokumenService.findById(Number(id));

    res
      .json({
        error: false,
        message: 'Template Dokumen detail',
        data: result,
      })
      .status(200);
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;

    const result = await this.templateDokumenService.create(data);

    res
      .json({
        error: false,
        message: 'Template Dokumen created',
        data: result,
      })
      .status(201);
  };

  update = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    const result = await this.templateDokumenService.update(+id, data);

    res
      .json({
        error: false,
        message: 'Template Dokumen updated',
        data: result,
      })
      .status(200);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.templateDokumenService.delete(+id);

    res
      .json({
        error: false,
        message: 'Template Dokumen deleted',
      })
      .status(200);
  };
}

export default new TemplateDokumenController(new TemplateDokumenService());
