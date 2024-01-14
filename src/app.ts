
import express, { Request, Response, NextFunction,json,urlencoded } from "express";

import cors from "cors";
import { corsUrl, environment } from "./config";

import routesV1 from "./core/routes";
import morgan from "morgan";
import middleware from './middleware/common'
import "./database"; // initialize database
import { Logger as log} from "./lib/logger/logger";
import { ApiError, InternalError, NotFoundError } from "./lib/api";
import { env } from "./env";
const Logger = new log(__filename)
process.on("uncaughtException", (e) => {
  Logger.error(e.message);
});

const app = express();


// app.use(json({ limit: "10mb" }));
// app.use(
//   urlencoded({
//     limit: "10mb",
//     extended: true,
//     parameterLimit: 50000,
//   })
// );
// app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
// app.use(morgan("tiny" ));
// // Routes
// app.use("/v1", routesV1);

// // catch 404 and forward to error handler
// app.use((req, res, next) => next(new NotFoundError()));

// // Middleware Error Handler
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof ApiError) {
//     ApiError.handle(err, res);
//   } else {
//     if (env.isDevelopment) {
//       Logger.error(err.message);
//       return res.status(500).send(err.message);
//     }
//     ApiError.handle(new InternalError(), res);
//   }
// });

middleware(app)

export  {app};
