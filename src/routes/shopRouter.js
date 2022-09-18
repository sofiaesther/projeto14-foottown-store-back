import express from "express";
import { getList } from "../controllers/shopListController.js"
import hadLogin from "../middlewares/authMiddleware.js"
const router = express.Router();
router.get("/products", getList, hadLogin);

export default router