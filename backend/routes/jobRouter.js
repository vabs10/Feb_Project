import  express  from "express";
import {allJobs, postJob ,myJob, editJob, deleteJob} from "../controllers/jobController.js"
import {isAuth} from "../middleware/auth.js"

const router = express.Router();

router.get("/all",allJobs);//Will return all unexpired jobs
router.get("/my",isAuth, myJob);//Will return jobs created by the Recruiter
router.post("/new",isAuth, postJob);
router.put("/edit/:id", isAuth, editJob)
router.delete("/delete/:id", isAuth, deleteJob)

export default router;