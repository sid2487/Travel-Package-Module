import express from "express";
import { createPackage, deletePackage } from "../controllers/package.controller.js";
import multer from "multer";

const router = express.Router();

// multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/packages", upload.single("image"), createPackage);
router.delete("/packages/:id", deletePackage);

export default router;