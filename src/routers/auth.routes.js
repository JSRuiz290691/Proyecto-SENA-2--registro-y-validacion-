import { Router } from "express";
const router = Router()

import * as authCtrl from "../controllers/auth.controler"
import {verifySignup, authjwt} from "../middlewares";

router.post("/signup", [authjwt.verifyToken, authjwt.isAdmin, verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signUp)
router.post("/signin", authCtrl.signin)

export default router;