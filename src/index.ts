import app from './server';
import { config } from './config';
import { logger } from './utils/logger';

const PORT = config.server.port;

async function startServer() {
  try {
    app.listen(PORT, () => {
      logger.info(
        `Server running on port ${PORT} (${config.server.nodeEnv} mode)`
      );
      logger.info(`Using DummyJSON API as data source`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
}

startServer();
