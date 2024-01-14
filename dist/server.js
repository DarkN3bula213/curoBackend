"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = require("./lib/logger/logger");
const env_1 = require("./env");
const Logger = new logger_1.Logger(__filename);
app_1.app
    .listen(env_1.env.app.port, () => {
    Logger.info(`server running on port : ${env_1.env.app.port}`);
})
    .on("error", (e) => Logger.error(e.message));
//# sourceMappingURL=server.js.map