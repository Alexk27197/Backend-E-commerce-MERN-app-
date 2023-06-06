import express from "express";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  categoryController,
} from "../controllers/createCategoryController.js";

const router = express.Router();

router.post(
  "/create-category/:id",
  requireSignIn,
  isAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

router.get("/get-category", categoryController);
export default router;
