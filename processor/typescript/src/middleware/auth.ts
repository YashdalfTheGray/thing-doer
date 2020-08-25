import { RequestHandler } from 'express';

const authHandler: RequestHandler = (req, res, next) => {
  const { HUE_REMOTE_TOKEN } = process.env;
  const authString = req.get('Authorization');

  if (!HUE_REMOTE_TOKEN) {
    res.status(403).json({
      success: false,
      code: 403,
      reason: 'Not authorized',
    });
  } else if (req.method === 'POST' && req.body.accessToken) {
    if (req.body.accessToken.toLowerCase() === HUE_REMOTE_TOKEN.toLowerCase()) {
      next();
    } else {
      res.status(403).json({
        success: false,
        code: 403,
        reason: 'Not authorized',
      });
    }
  } else if (authString) {
    const authMethod = authString.split(' ')[0];
    const authToken = authString.split(' ')[1].toLowerCase();

    if (authMethod !== 'Bearer') {
      res.status(401).json({
        success: false,
        code: 401,
        reason: 'Malformed auth header',
      });
    } else if (authToken !== HUE_REMOTE_TOKEN.toLowerCase()) {
      res.status(403).json({
        success: false,
        code: 403,
        reason: 'Not authorized',
      });
    } else if (authToken === HUE_REMOTE_TOKEN.toLowerCase()) {
      next();
    }
  } else {
    res.status(401).json({
      success: false,
      code: 401,
      reason: 'No auth token found in request',
    });
  }
};

export { authHandler };
