import express from 'express';
import {fullPricesController} from '../../controllers/prices_controller'
const router = express.Router();

router.get('/full', fullPricesController);

export default router;
