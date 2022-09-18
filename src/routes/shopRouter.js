import express from "express";
import { getList } from "../controllers/shopListController.js"

const router = express.Router();
router.get("/cart", getList);

export default router