import { app } from './app';
import { env } from './env';
import { Logger as log } from './lib/logger/logger';

const Logger = new log(__filename);

// let server: any;
const server = app
  .listen(env.app.port, () => {
    Logger.info(`Server running on port: ${env.app.port}`);
  })
  .on('error', (e) => Logger.error(e.message));

const exitHandler = () => {
  if (server) {
    server.close(() => {
      Logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  Logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  Logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

process.on('SIGINT', () => {
  Logger.info('SIGINT received');
  if (server) {
    server.close();
  }
});
