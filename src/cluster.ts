import cluster from 'cluster';
import os from 'os';
import fs from 'fs';
import http from 'http';
import https from 'https';
import config from 'config';
import { app } from '.'; // Adjust the import path if necessary
import Logger from './services/Logger';
import errorMiddleWare from './middlewares/errorMiddleware'
// Use the error handling middleware
app.use(errorMiddleWare);


const appPort = config.get('app');
console.log('appPort : ', appPort);
const appUseHttps = config.get('app.useHttps');
const appHttpsPort = config.get('app.httpsPort');

const numCPUs = os.cpus().length;
const port = appPort || 3300;
const httpsPort = appHttpsPort || 3443;
const useHttps = appUseHttps === 'true';

const logger = Logger.getInstance();

if (cluster.isPrimary) {
  logger.info(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.error(`Worker ${worker.process.pid} died. Forking a new worker.`);
    cluster.fork();
  });
} else {
  
    let server: http.Server | https.Server;

  if (useHttps) {
    const options = {
      key: fs.readFileSync('keys/air-burma-key.pem'),
      cert: fs.readFileSync('keys/air-burma-cert.pem')
    };
    server = https.createServer(options, app);
    server.listen(httpsPort, () => {
      logger.info(`Worker ${process.pid} started HTTPS server at https://localhost:${httpsPort}`);
    });
  } else {
    server = app.listen(port, () => {
      logger.info(`Worker ${process.pid} started HTTP server at http://localhost:${port}`);
    });
  }

  const gracefulShutdown = () => {
    logger.info(`Worker ${process.pid} received kill signal, shutting down gracefully.`);
    server.close(() => {
      logger.info(`Worker ${process.pid} closed out remaining connections.`);
      process.exit(0);
    });

    setTimeout(() => {
      logger.error(`Worker ${process.pid} could not close connections in time, forcefully shutting down.`);
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
}
