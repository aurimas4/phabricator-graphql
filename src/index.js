import 'dotenv/config';
import express from 'express';

import differentialApp from './graphql/differential/app';
import userApp from './graphql/user/app';

const app = express();

differentialApp(app);
userApp(app);

app.listen(4000, () => console.log('Now browse to http://localhost:4000/user or http://localhost:4000/diff'));
