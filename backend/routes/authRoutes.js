import express from "express"
import {register,verifyEmail,resendOtp,verifyLogin,login} from "../controllers/authController.js"

const router = express.Router();

router.post('/register',register)
router.post("/verify-email",verifyEmail)
router.post("/resend-otp",resendOtp)
router.post("/login",login)

export default router