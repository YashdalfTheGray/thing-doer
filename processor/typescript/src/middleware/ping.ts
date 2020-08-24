import { RequestHandler, Request, Response } from 'express';

const pingHandler: RequestHandler = (req: Request, res: Response) => {
  res.status(200).send('pong\n').end();
};

export { pingHandler };
