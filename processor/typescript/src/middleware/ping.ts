import { RequestHandler } from 'express';

const pingHandler: RequestHandler = (req, res) => {
  res.status(200).send('pong\n').end();
};

export { pingHandler };
