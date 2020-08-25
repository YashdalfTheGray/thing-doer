import { RequestHandler } from 'express';

const pingHandler: RequestHandler = (req, res) => {
  res.status(200).send('pong\n').end();
};

const deepPingHandler: RequestHandler = (req, res) => {
  res.status(200).json({
    status: 'okay',
  });
};

export { pingHandler, deepPingHandler };
