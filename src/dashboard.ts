import { Request, Response } from 'express';

import { User, UserWithoutPassword } from '~/types';

import serverState from '~/serverState';

function dashboard(req: Request, res: Response) {
  const cookie: number = parseInt(req.cookies.sessionToken);
  const user: UserWithoutPassword = serverState.getUserWithoutPasswordByToken(cookie);
  if (!user) res.send('<p>You are not logged in. :(</p>');
  else res.send(`<p>You are logged in as ${user.email}.</p><p>If you go back to the homepage, you should be automatically redirected here!</p><a href="/logout"/>Logout Now</a>`);
}

export default dashboard;