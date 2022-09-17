import express from 'express';
import { addCart, removeCart, getCart } from '../controllers/cartcontroller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import cartMiddleware from '../middlewares/cartMiddlewares.js';

const router = express.Router();

router.use(authMiddleware);

router.use(cartMiddleware);


router.put('/addCart',addCart);
router.put('/removeCart',removeCart);
router.get('/cart',getCart);


export default router;