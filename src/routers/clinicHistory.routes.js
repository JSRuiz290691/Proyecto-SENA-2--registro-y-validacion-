import { Router } from "express";
const router = Router()

import * as clinicHistoryCtrol from "../controllers/ch.controllers"
import {authjwt} from "../middlewares" // se importan por modulos


router.post("/", [authjwt.verifyToken, authjwt.isAdminOrMedic] , clinicHistoryCtrol.createClinicHistory) // requiere token o pase, se incluye verifyToken antes, para posteriormente crear

router.get("/pet/:petId", clinicHistoryCtrol.getClinicHistoryByPetId)

router.post("/consultation", [authjwt.verifyToken, authjwt.isAdminOrMedic] , clinicHistoryCtrol.addConsultation)

router.get("/:clinicHistoryId", [authjwt.verifyToken, authjwt.isAdminOrMedic] ,clinicHistoryCtrol.getClinicHistoryById)

// router.put("/:clinicHistoryId", [authjwt.verifyToken, authjwt.isAdminOrMedic], clinicHistoryCtrol.updateclinicHistoryById)

router.delete("/:clinicHistoryId", [authjwt.verifyToken, authjwt.isAdminOrMedic], clinicHistoryCtrol.deleteClinicHistoryById)


export default router;