import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import chalk from 'chalk';

import { wrap } from './utils';
import { pingHandler, deepPingHandler } from './middleware';

const port = process.env.PORT || process.argv[2] || 8080;

const app = express();

app.use(bodyParser.json());
app.use(morgan('common'));
const apiRouter = express.Router();

apiRouter.get('/ping', wrap(pingHandler));
apiRouter.get('/deep_ping', wrap(deepPingHandler));

app.use('/api', apiRouter);

app.listen(port, () =>
  // tslint:disable-next-line
  console.log(`Server running on port ${chalk.green(port)}`)
);
