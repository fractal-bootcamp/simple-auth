import express, { Response, Request } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import indexHandler from './src/_index';
import dashboard from '~/src/dashboard';
import loginHandler from '~/src/loginHandler';
import logoutHandler from './src/logoutHandler';
import signupHandler from './src/signupHandler';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', indexHandler);
app.get('/dashboard/', dashboard);
app.get('/logout/', logoutHandler)

app.post('/login.html', loginHandler);
app.post('/signup.html', signupHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})