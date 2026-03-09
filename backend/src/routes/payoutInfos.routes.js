import express from "express";
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {
  getMyPayoutInfo,
  upsertMyPayoutInfo,
} from "../controllers/payoutInfos.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyPayoutInfo);
router.put("/me", authMiddleware, upsertMyPayoutInfo);

export default router;