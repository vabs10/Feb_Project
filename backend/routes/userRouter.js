import express from "express";
import {
  signup,
  login,
  logout,
  getUser,
} from "../controllers/userController.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", isAuth, logout);
router.get("/user", isAuth, getUser);

export default router;
