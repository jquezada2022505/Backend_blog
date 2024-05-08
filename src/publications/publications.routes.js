import { check } from "express-validator";
import {
    publicationsGet,
    publicationsPost,
    getPublicationsById,
    publicationsDelete
} from "./publications.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import express from 'express';

const router = express.Router();

router.post('/publications', publicationsPost);

router.get("/", publicationsGet);

router.get(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        validarCampos,
    ],
    getPublicationsById
);

router.post(
    "/", [
        check("title", "The title is obligatory").not().isEmpty(),
        check("description", "The description is obligatory").not().isEmpty(),
        validarCampos,
    ],
    publicationsPost
);

router.delete(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        validarCampos,
    ],
    publicationsDelete
);

export default router;