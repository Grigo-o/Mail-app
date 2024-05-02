import express from "express";
import emailController from "../controllers/email.controller.js";

const router = express.Router();

router.post("/compose", emailController.compose);
router.get("/inbox", emailController.getInbox);

export default router;
