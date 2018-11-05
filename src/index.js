import 'dotenv/config';
import express from 'express';

import differentialApp from './graphql/differential/app';
import userApp from './graphql/user/app';

const app = express();

differentialApp(app);
userApp(app);

app.listen(process.env.APP_PORT, () => console.log('Now browse to http://localhost:4000/user or' +
    ' http://localhost:4000/diff'));
