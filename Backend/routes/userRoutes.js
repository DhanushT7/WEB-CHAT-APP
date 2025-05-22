import express from "express"
import { createGroupChat, renameGroup, allUsers } from "../controllers/userControllers.js"

const userRoutes = express.Router();

userRoutes.post('/create/group', createGroupChat);
userRoutes.put('/rename/group', renameGroup);
userRoutes.get('/allUsers', allUsers);


export default userRoutes;