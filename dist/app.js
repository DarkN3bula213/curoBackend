"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = __importDefault(require("./middleware/common"));
require("./database"); // initialize database
const logger_1 = require("./lib/logger/logger");
const Logger = new logger_1.Logger(__filename);
process.on("uncaughtException", (e) => {
    Logger.error(e.message);
});
const app = (0, express_1.default)();
exports.app = app;
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
(0, common_1.default)(app);
//# sourceMappingURL=app.js.map