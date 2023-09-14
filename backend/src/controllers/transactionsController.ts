import { Request, Response } from "express";
import { BaseController } from "./baseController";

class TransactionsController extends BaseController {
  getAll = (req: Request, res: Response) => {
    res.status(200).send({
      message: "here all transactions",
    });
  };

  getOne = (req: Request<{ id: string }>, res: Response) => {
    res.status(200).send({
      message: `here will be transaction id[${req.params.id}]`,
    });
  };
}

export { TransactionsController };
