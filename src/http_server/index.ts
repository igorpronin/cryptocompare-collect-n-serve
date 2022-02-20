const env = require('dotenv').config().parsed;
import express from 'express';
import router from './router';
import controller404 from './controllers/controller404';
import errorMiddleware from './middlewares/error_middleware';
import incomeMiddleware from './middlewares/error_middleware';
const app = express();

const port = env.HTTP_SERVER_PORT;

app.use(express.json());

app.use('*', incomeMiddleware);
app.use(env.HTTP_API_ROOT, router);
app.all('*', controller404);
app.use(errorMiddleware);

app.listen(port, () => console.log(`Server is listening at ${env.APP_HOSTNAME}:${port}`));
