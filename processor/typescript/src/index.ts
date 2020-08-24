import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import chalk from 'chalk';

const port = process.env.PORT || process.argv[2] || 8080;

const app = express();

app.use(bodyParser.json());
app.use(morgan('common'));
const apiRouter = express.Router();

app.use('/api', apiRouter);

app.listen(port, () =>
  // tslint:disable-next-line
  console.log(`Server running on port ${chalk.green(port)}`)
);
