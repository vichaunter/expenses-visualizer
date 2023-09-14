import { Router } from "express";
import { ControllerType } from ".";
import { TransactionsController } from "../controllers/transactionsController";

const transactionsMapper = (
  controller: ControllerType<TransactionsController>
): Router => {
  const router = Router();
  const Controller = new controller();

  router.use("/list", Controller.getAll);
  router.use("/:id(\\d+)", Controller.getOne);

  return router;
};

export { transactionsMapper };
