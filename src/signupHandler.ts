import { Request, Response } from "express";
import serverState from "~/serverState";
import { UserFormData } from "~/types";

function signupHandler(req: Request, res: Response) {
  const formData = req.body as UserFormData;
  if (serverState.doesEmailExist(formData.email)) res.redirect('/signup_error.html');
  serverState.createUser(formData.email, formData.password);
  res.redirect('/signup_success.html');
}

export default signupHandler;