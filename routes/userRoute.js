import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router
  .route("/register")
  .post(userController.createUser)
//   .get(userController.getAllPhotos);

// router.route("/:id").get(userController.getAPhoto)

export default router;
