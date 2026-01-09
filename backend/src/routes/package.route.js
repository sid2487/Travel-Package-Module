import express from "express";
import { downloadPdf, getAllPackages, getOnePackage } from "../controllers/package.controller.js";


const router = express.Router();

router.get("/packages", getAllPackages);
router.get("/packages/:id", getOnePackage);
router.get("/packages/:id/pdf", downloadPdf);

export default router;
