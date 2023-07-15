import express from "express";

const router = express.Router();

import { registercontroller, loginController, userController }  from "../controllers";


router.post('/register', registercontroller.register)
router.post('/login', loginController.login)
router.get('/me', userController.me)


export default router;