import { Router } from "express";
import { check} from "express-validator";
import {
    comentsGet,
    comentsPost,
    getComentsByParentComentId,
    comentsDelete
} from "./coments.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router();

router.get("/", comentsGet);

router.get(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        validarCampos,
    ],
    getComentsByParentComentId
);

router.post(
    "/:idPublication", [
        check("descriptionComent", "The description is obligatory").not().isEmpty(),
        check("responseComent", "The response coment is obligatory").not().isEmpty(),
        validarCampos,
    ],
    comentsPost
);

router.delete(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        validarCampos,
    ],
    comentsDelete
);

export default router;