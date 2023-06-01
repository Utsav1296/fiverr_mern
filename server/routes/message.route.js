import express from "express"
import { createMessage, getAllMessages } from "../controllers/message.controller.js"
import { verifyToken } from "../middleware/jwt.js"


const router = express.Router();

router.post('/:id', verifyToken, createMessage)
router.get('/:id', verifyToken, getAllMessages)

export default router;