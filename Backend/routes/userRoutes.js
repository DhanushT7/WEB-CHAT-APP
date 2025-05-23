import express from "express"
import { createGroupChat, renameGroup, allUsers } from "../controllers/userControllers.js"
import { protect } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

//userRoutes.post('/group/create', createGroupChat);
//userRoutes.put('/group/rename', renameGroup);

userRoutes.get('/allUsers', protect, allUsers);


export default userRoutes;