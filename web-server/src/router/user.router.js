import express from "express";

import { userController } from "../controllers";
import { registerRule, authenticate } from "../middlewares";

const router = express.Router();
router.get("/auth", authenticate, userController.tryAutoSignIn);
router.post("/signup", registerRule, userController.signUpUser);
router.post("/signin", userController.signInUser);
router.post(
  "/click-logs/news/:newsDigestId",
  authenticate,
  userController.clickLogger
);

router.get("/:username");

export default router;
