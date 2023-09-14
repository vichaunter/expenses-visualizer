import http from "node:http";
import { PORT } from "../constants";
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
const init = async () => {
  return server;
};

export { init as startServer };
