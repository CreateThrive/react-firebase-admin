import { https } from 'firebase-functions';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

import validateFirebaseIdToken from './middlewares/auth';

import usersRoute from './routes/users';

const app = express();

app.use(cors({ origin: true }));
app.use(cookieParser());
app.use(validateFirebaseIdToken);

app.use('/users', usersRoute);

export default https.onRequest(app);
