import { Router } from "express";
import CheckoutMiddleware from "../middlewares/checkoutMiddleware.js";
import AuthMiddleware from '../middlewares/authMiddleware.js';
import checkout from "../controllers/boughtcontroller.js";

const router = express.Router();

router.use(AuthMiddleware);
router.use(CheckoutMiddleware);

router.post('/check-out', checkout);

export default router;