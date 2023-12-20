import { Router } from "express";
const router = Router()

import * as userCtrl from "../controllers/user.controller"
import {authjwt, verifySignup} from "../middlewares"

router.get("/", [authjwt.verifyToken, authjwt.isAdmin], userCtrl.getUsers)

router.get("/:userId", userCtrl.getUserById)

router.put("/:userId",[authjwt.verifyToken, authjwt.isAdmin, verifySignup.checkRolesExisted], userCtrl.updateUserById)

router.delete("/:userId", [authjwt.verifyToken, authjwt.isAdmin, verifySignup.checkRolesExisted], userCtrl.deleteUserById)

export default router;