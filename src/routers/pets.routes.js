import { Router } from "express";
const router = Router()

import * as petsCtrol from "../controllers/pets.controllers"

router.post("/", petsCtrol.createPet)
router.get("/", petsCtrol.getPets)
router.get("/:petId", petsCtrol.getPetById)
router.put("/:petId", petsCtrol.updatePetById)
router.delete("/:petId", petsCtrol.deletePetById)

export default router;