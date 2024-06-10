import { Request, Response } from 'express';

import serverState from '~/serverState';

function logoutHandler (req: Request, res: Response) {
  const cookie = parseInt(req.cookies.sessionToken);
  if (serverState.validateSessionToken(cookie)) serverState.invalidateSessionToken(cookie);
  res.redirect('/');
}

export default logoutHandler;