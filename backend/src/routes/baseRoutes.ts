import { Request, Response } from "express";

export const notExistingRoute = (req: Request, res: Response): any => {
  return res.status(404).send({ message: "invalid endpoint" });
};
