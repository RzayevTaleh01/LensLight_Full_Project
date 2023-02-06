import express from "express";
import * as testController from "../controllers/testController.js";

const router = express.Router();

router
  .route("/")
  .post(testController.createTest)

export default router;