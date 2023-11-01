import app from "@/app";
import { logger } from "@utils/logger";
import { NODE_ENV } from "@config";
import { MONGODB_URI, PORT } from '@config';
import validateEnv from "@utils/validateEnv";
import routes from './routes';
import connection from '@/databases';


validateEnv();
connection(MONGODB_URI);

const version = '/v1';
routes.forEach((route) => {
  const path = version + route.path;
  app.use(path, route.func);
});

app.listen(PORT, () => {
  logger.info(`======= ENV: ${NODE_ENV} =======`);
  logger.info(`🚀 App listening on the port http://localhost:${PORT}`);
});
