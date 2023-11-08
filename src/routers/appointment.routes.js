import { Router } from "express";
const router = Router()

import * as appointmentCtrol from "../controllers/appointment.controllers"
import {authjwt} from "../middlewares" // se importan por modulos


router.post("/", [authjwt.verifyToken] , appointmentCtrol.createAppointment) // requiere token o pase, se incluye verifyToken antes, para posteriormente crear

router.get("/", [authjwt.verifyToken] , appointmentCtrol.getappointment)

router.get("/:appointmentId", appointmentCtrol.getAppointmentById)

router.put("/:appointmentId", [authjwt.verifyToken], appointmentCtrol.updateAppointmentById)

router.delete("/:appointmentId", [authjwt.verifyToken], appointmentCtrol.deleteAppointmentById)
// router.delete("/:petId", [authjwt.verifyToken, authjwt.isAdmin, authjwt.isMedico], petsCtrol.deletePetById)


export default router;