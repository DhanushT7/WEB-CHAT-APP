import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import {accessChat, fetchChat, createGroup, renameGroup, addToGroup, removeFromGroup} from "../controllers/chatControllers.js"

const chatRoutes = express.Router()

chatRoutes.post("/", protect, accessChat);
chatRoutes.get("/", protect, fetchChat);
chatRoutes.post("/group/create", protect, createGroup);
chatRoutes.put("/group/rename", protect, renameGroup);
chatRoutes.put("/group/add", protect, addToGroup)
chatRoutes.put("/group/remove", protect, removeFromGroup)

export default chatRoutes;