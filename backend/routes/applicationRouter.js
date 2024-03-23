import express from "express";
import { isAuth } from "../middleware/auth.js";
import {
  applicantApplications,
  applicantDeleteApplications,
  postApplication,
  recruiterApplications,
  acceptApplication,
  rejectApplication,
} from "../controllers/applicationControllers.js";

const router = express.Router();

router.get("/application/applicant", isAuth, applicantApplications);
router.get("/application/recruiter", isAuth, recruiterApplications);
router.post("/application/post", isAuth, postApplication);
router.delete("/application/delete/:id", isAuth, applicantDeleteApplications);
router.put("/application/accept/:id", isAuth, acceptApplication); 
router.put("/application/reject/:id", isAuth, rejectApplication); 

export default router;
