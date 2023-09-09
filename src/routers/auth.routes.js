import { Router } from "express";
const router = Router()

import * as authCtrl from "../controllers/auth.controler"

router.post("/signup", authCtrl.signUp)
router.post("/signin", authCtrl.signin)

export default router;