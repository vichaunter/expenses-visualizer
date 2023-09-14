import express, { Express } from "express";
import http from "node:http";
import { PORT } from "../constants";
import routes, { Routes } from "../routes";
import { notExistingRoute } from "../routes/baseRoutes";

const SEARCH_LIMIT = 30;

var invalidPortsCount = 0;
const getFreePortFrom = (port: number = PORT): Promise<number> =>
  new Promise((resolve, reject) => {
    {
      const server = http.createServer();
      server
        .listen(port, () => {
          resolve(port);
          server.close();
        })
        .on("error", (err) => {
          console.log({ err, port });
          invalidPortsCount++;
          if (invalidPortsCount > SEARCH_LIMIT) return resolve(0);
          setTimeout(() => {
            getFreePortFrom(port + 1).then((port) => resolve(port));
          }, 10);
        });
    }
  });

const mapRoutes = (app: Express, routes: Routes[]) => {
  for (let route of routes) {
    app.use(route.path, route.controller);
  }

  app.use(notExistingRoute);
};

const init = async () => {
  const app = express();
  const port = await getFreePortFrom();

  mapRoutes(app, routes);

  const server = http.createServer(app).listen(port, () => {
    const { port } = server.address() as { port: number };
    console.log(`Server started on port: http://localhost:${port}`);
  });

  return server;
};

export { init as startServer };
