import express from "express";
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  getMyAddresses,
  createAddress,
  deleteAddress
} from "../controllers/addresses.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyAddresses);
router.post("/", authMiddleware, createAddress);
router.delete("/:id", authMiddleware, deleteAddress);
export default router;