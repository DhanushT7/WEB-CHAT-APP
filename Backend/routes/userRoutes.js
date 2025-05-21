import express from "express"
import { createGroupChat, renameGroup } from "../controllers/userControllers.js"

const userRoutes = express.Router();

userRoutes.post('/create/group', createGroupChat);
userRoutes.put('/rename/group', renameGroup);


export default userRoutes;