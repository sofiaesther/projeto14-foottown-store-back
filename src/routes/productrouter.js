import express from "express";
import AuthMiddleware from '../middlewares/authMiddleware.js';
import { getProduct } from '../controllers/productcontroller.js';

const router = express.Router();

router.use(AuthMiddleware);

router.get('/product/:idProduct', getProduct);

export default router;