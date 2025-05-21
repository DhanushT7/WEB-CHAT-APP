import express from "express"

import {checkEmailExists, createAccount, login, checkEmail, verifyEmail, sendRecoveryEmail, update} from "../controllers/authControllers.js"

const authRoutes = express.Router();

authRoutes.post("/signup/checkEmailExists", checkEmailExists);
authRoutes.post("/createAccount", createAccount);
authRoutes.post("/login", login);
authRoutes.post("/check-email", checkEmail);
authRoutes.post("/verify_email", verifyEmail);
authRoutes.post("/send_recovery_email", sendRecoveryEmail);
authRoutes.post("/update", update);

export default authRoutes;