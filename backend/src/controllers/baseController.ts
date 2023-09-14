import { Request, Response } from "express";

abstract class BaseController {
  abstract getOne(req: Request, res: Response): any;
  abstract getAll(req: Request, res: Response): any;
}

export { BaseController };
