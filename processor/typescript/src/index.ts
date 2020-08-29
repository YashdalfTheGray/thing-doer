import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import chalk from 'chalk';

import { pingHandler, deepPingHandler } from './middleware';

dotenv.config();

const port = process.env.PORT || process.argv[2] || 8080;

const app = express();

app.use(bodyParser.json());
app.use(morgan('common'));
const apiRouter = express.Router();

apiRouter.get('/ping', pingHandler);
apiRouter.get('/deep_ping', deepPingHandler);

app.use('/api', apiRouter);

app.listen(port, () =>
  // tslint:disable-next-line
  console.log(`Server running on port ${chalk.green(port)}`)
);
