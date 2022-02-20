import express from 'express';
const router = express.Router();
import pricesRoute from './routes/prices_route';

router.use('/prices', pricesRoute);

export default router;
