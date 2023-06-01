import express from "express"
import { verifyToken } from "../middleware/jwt.js"
import { createReviews, getReviews, deleteReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", verifyToken, createReviews)
router.get("/:gigId", getReviews)
router.delete("/:id", deleteReviews)

export default router;