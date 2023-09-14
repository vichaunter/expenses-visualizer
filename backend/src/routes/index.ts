import { Router } from "express";
import { TransactionsController } from "../controllers/transactionsController";
import { transactionsMapper } from "./transactionsRoutes";

export type ControllerType<T> = new (...args: any[]) => T;

export type Routes = {
  path: string;
  controller: Router;
};

const routes: Routes[] = [
  {
    path: "/transactions",
    controller: transactionsMapper(TransactionsController),
  },
];

export default routes;
