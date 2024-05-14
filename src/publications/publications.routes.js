import { check } from "express-validator";
import { Router } from "express";

import { publicationPut, publicationGet, publicationById } from "./publications.controller.js";

const router = Router();

router.get("/publications", publicationGet)

router.get("/publication/:id", publicationById)

router.put(
    "/publication/:id", [
        check("id", "El id es obligatorio").not().isEmpty(),
        check("nombre", "El título es obligatorio").not().isEmpty(),
        check("comentario", "La descripción es obligatoria").not().isEmpty(),
    ],
    publicationPut
);

export default router;