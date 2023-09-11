import { Router } from "express";
const router = Router()

import * as petsCtrol from "../controllers/pets.controllers"
import {authjwt} from "../middlewares" // se importan por modulos


router.post("/", [authjwt.verifyToken, authjwt.isAdmin, authjwt.isMedico] , petsCtrol.createPet) // requiere token o pase, se incluye verifyToken antes, para posteriormente crear

router.get("/", petsCtrol.getPets)

router.get("/:petId", petsCtrol.getPetById)

router.put("/:petId", [authjwt.verifyToken, authjwt.isAdmin, authjwt.isMedico], petsCtrol.updatePetById)

router.delete("/:petId", [authjwt.verifyToken, authjwt.isAdmin, authjwt.isMedico], petsCtrol.deletePetById)


export default router;