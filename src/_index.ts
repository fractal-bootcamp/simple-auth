import { Request, Response } from 'express';

import serverState from '~/serverState';

function indexHandler (req: Request, res: Response) {
  const cookie = parseInt(req.cookies.sessionToken);
  const user = serverState.getUserWithoutPasswordByToken(cookie);
  if (!user) res.redirect('/homepage.html');
  else res.redirect('/dashboard/');
}

export default indexHandler;