import { Request, Response } from 'express';

import { User, SessionToken, UserFormData } from '~/types';

import serverState from '~/serverState';

export default function loginHandler(req: Request, res: Response) {
  const formData = req.body as UserFormData;
  const email = formData.email;
  const password = formData.password;

  const user: User | undefined = serverState.validateUser(email, password);
  if (!user) return res.status(401).send('Invalid username or password');

  const newSessionToken: SessionToken = serverState.createToken(user.id);

  return res.cookie('sessionToken', newSessionToken.token).redirect('/dashboard/');
}