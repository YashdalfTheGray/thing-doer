import { RequestHandler } from 'express';

const pingHandler: RequestHandler = (req, res) => {
  res.status(200).send('pong\n').end();
};

const deepPingHandler: RequestHandler = (req, res) => {
  res.status(200).json({
    status: 'okay',
    apiTokenFound: !!process.env.SECRET_TOKEN,
  });
};

const determineStatus = (checksList: boolean[]) {
  const checkPassed = (check: boolean) => check;
  if (checksList.every(checkPassed)) {
    return 'okay';
  } else if (checksList.some(checkPassed)) {
    return 'partial_success';
  } else {
    return 'error'
  }
}

export { pingHandler, deepPingHandler };
