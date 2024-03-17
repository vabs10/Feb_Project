const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const router = express.Router();
const { Application } = require("./Schema/Application");
const { JobApplicant } = require("./Schema/JobApplicant");
const { JobSchema } = require("./Schema/Job");
const { Rating } = require("./Schema/Rating");
const { User } = require("./Schema/User");

const { Recruiter } = require("./Schema/Recruiter");

// Need to commit
function init() {
  app.use(cors());
  app.use(express.json());

  mongoose
    .connect("mongodb://127.0.0.1/jobPortal")
    .then((res) => console.log("Connected to the DB"))
    .catch((err) => console.log("Error :-" + err));
  app.use("/jobPortal", router);
}

init();

router.get("/application", async (req, res) => {
  try {
    const applications = await Application.find({});
    console.log("getStudentsAsync :: applications Fetched :- ", applications);
    res.json(applications);
  } catch (err) {
    console.log("Error findind the data" + err);
  }
});

router.get("/recruiter", async (req, res) => {
  try {
    const recruiters = await Recruiter.find({});
    console.log("getStudentsAsync :: recruiters Fetched :- ", recruiters);
    res.json(recruiters);
  } catch (err) {
    console.log("Error findind the data" + err);
  }
});

router.get("/rating", async (req, res) => {
  try {
    const recruiters = await Rating.find({});
    console.log("getStudentsAsync :: recruiters Fetched :- ", recruiters);
    res.json(recruiters);
  } catch (err) {
    console.log("Error findind the data" + err);
  }
});

router.get("/user", async (req, res) => {
  try {
    const recruiters = await User.find({});
    console.log("getStudentsAsync :: recruiters Fetched :- ", recruiters);
    res.json(recruiters);
  } catch (err) {
    console.log("Error findind the data" + err);
  }
});

router.post("/applicant", async (req, res) => {
  try {
    console.log("Application", req.body);
    const newApplication = new JobApplicant({
      ...req.body,
    });
    const response = await newApplication.save();
    res.send("Success" + response);
  } catch (err) {
    console.log("Error Adding the data" + err);
  }
});

router.get("/applicant", async (req, res) => {
  try {
    const applications = await JobApplicant.find({});
    console.log("getStudentsAsync :: applications Fetched :- ", applications);
    res.json(applications);
  } catch (err) {
    console.log("Error findind the data" + err);
  }
});

router.post("/recruiter", async (req, res) => {
  try {
    console.log("Application", req.body);
    const newApplication = new Recruiter({
      ...req.body,
    });
    const response = await newApplication.save();
    res.send("Success" + response);
  } catch (err) {
    console.log("Error Adding the data" + err);
  }
});

router.post("/rating", async (req, res) => {
  try {
    console.log("Application", req.body);
    const newApplication = new Rating({
      ...req.body,
    });
    const response = await newApplication.save();
    res.send("Success " + response);
  } catch (err) {
    console.log("Error Adding the data " + err);
  }
});

router.post("/user", async (req, res) => {
  try {
    console.log("Application", req.body);
    const newApplication = new User({
      ...req.body,
    });
    const response = await newApplication.save();
    res.send("Success " + response);
  } catch (err) {
    console.log("Error Adding the data " + err);
  }
});

router.put("/recruiter/:id", async (req, res) => {
  console.log("Received the Update request!");

  try {
    console.log("Request Body :- ", req.body);
    if (Object.keys(req.body).length === 0) {
      res.send("Unable to add recruiter as we received empty body");
      return;
    }
    const recruiterId = req.params.id;
    const response = await Recruiter.findByIdAndUpdate(
      { _id: recruiterId },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true } //Returns the modified data, without this you will get original data
    );
    res.send("Success, student got updated!" + response);
  } catch (err) {
    res.send("Something went wrong, contact your admin!!" + err);
  }
});

router.put("/rating/:id", async (req, res) => {
  console.log("Received the Update request!");

  try {
    console.log("Request Body :- ", req.body);
    if (Object.keys(req.body).length === 0) {
      res.send("Unable to add recruiter as we received empty body");
      return;
    }
    const recruiterId = req.params.id;
    const response = await Rating.findByIdAndUpdate(
      { _id: recruiterId },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true } //Returns the modified data, without this you will get original data
    );
    res.send("Success, student got updated!" + response);
  } catch (err) {
    res.send("Something went wrong, contact your admin!!" + err);
  }
});

router.put("/user/:id", async (req, res) => {
  console.log("Received the Update request!");

  try {
    console.log("Request Body :- ", req.body);
    if (Object.keys(req.body).length === 0) {
      res.send("Unable to add recruiter as we received empty body");
      return;
    }
    const recruiterId = req.params.id;
    const response = await User.findByIdAndUpdate(
      { _id: recruiterId },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true } //Returns the modified data, without this you will get original data
    );
    res.send("Success, student got updated!" + response);
  } catch (err) {
    res.send("Something went wrong, contact your admin!!" + err);
  }
});

router.delete("/recruiter/:id", async (req, res) => {
  console.log("Received the delete request!");
  const recruiterId = req.params.id;

  //Add Validation for id
  const response = await Recruiter.findByIdAndDelete(recruiterId);
  res.send(response);
});

router.delete("/rating/:id", async (req, res) => {
  console.log("Received the delete request!");
  const recruiterId = req.params.id;

  //Add Validation for id
  const response = await Rating.findByIdAndDelete(recruiterId);
  res.send(response);
});

router.delete("/user/:id", async (req, res) => {
  console.log("Received the delete request!");
  const recruiterId = req.params.id;

  //Add Validation for id
  const response = await User.findByIdAndDelete(recruiterId);
  res.send(response);
});

router.post("/user/signup", async (req, res) => {
  try {
    const { email, password, type } = req.body;

    // Check if the user type is valid
    if (type !== "Recruiter" && type !== "Applicant") {
      return res.status(400).send("Invalid user type");
    }

    let newUser;
    if (type === "Recruiter") {
      const { name, contactNumber, companyName, bio } = req.body;
      newUser = new User({
        email,
        password,
        type,
        name,
        contactNumber,
        companyName,
        bio,
      });
    } else if (type === "Applicant") {
      const { name, contactNumber, education, skills, resume, profile } = req.body;
      newUser = new User({
        email,
        password,
        type,
        name,
        contactNumber,
        education,
        skills,
        resume,
        profile,
      });
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    const response = await newUser.save();
    res.status(201).send("User created successfully" + response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});


router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

router.post("/jobs", async (req, res) => {
  try {
    const { title, description, requirements } = req.body;
    const newJob = new JobSchema({
      title,
      description,
      requirements,
    });
    const response = await newJob.save();
    res.status(201).send("Job created successfully: " + response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating job");
  }
});

router.put("/jobs/:id", async (req, res) => {
  console.log("Received the Update job request!");
  try {
    const jobId = req.params.id;
    const { title, description, requirements } = req.body;
    const updatedJob = await JobSchema.findByIdAndUpdate(
      jobId,
      { title, description, requirements },
      { new: true }
    );
    res.send("Success, job updated: " + updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating job");
  }
});

router.delete("/jobs/:id", async (req, res) => {
  console.log("Received the delete job request!");
  try {
    const jobId = req.params.id;
    const response = await JobSchema.findByIdAndDelete(jobId);
    res.send("Success, job deleted: " + response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting job");
  }
});

router.post("/applications/:jobId/apply", async (req, res) => {
  try {
    const { jobId } = req.params;
    const { applicantId, statementOfPurpose } = req.body;

    const job = await JobSchema.findById(jobId);
    if (!job) {
      return res.status(404).send("Job not found");
    }

    const applicant = await JobApplicant.findById(applicantId);
    if (!applicant) {
      return res.status(404).send("Applicant not found");
    }

    // Logic to apply for the job, save application details, etc.
    const application = new Application({
      jobId,
      applicantId,
      statementOfPurpose,
    });
    const response = await application.save();
    res.status(201).send("Application submitted successfully: " + response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting application");
  }
});

router.put("/applications/:applicationId/accept", async (req, res) => {
  try {
    const { applicationId } = req.params;
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status: "Accepted" },
      { new: true }
    );
    res.send("Success, application accepted: " + updatedApplication);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error accepting application");
  }
});

router.put("/applications/:applicationId/shortlist", async (req, res) => {
  try {
    const { applicationId } = req.params;
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status: "Shortlisted" },
      { new: true }
    );
    res.send("Success, application shortlisted: " + updatedApplication);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error shortlisting application");
  }
});

router.put("/applications/:applicationId/reject", async (req, res) => {
  try {
    const { applicationId } = req.params;
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status: "Rejected" },
      { new: true }
    );
    res.send("Success, application rejected: " + updatedApplication);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error rejecting application");
  }
});

router.get("/applications/:applicationId/resume", async (req, res) => {
  try {
    const { applicationId } = req.params;
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).send("Application not found");
    }
    const applicant = await JobApplicant.findById(application.applicantId);
    if (!applicant) {
      return res.status(404).send("Applicant not found");
    }
    // Return applicant's resume
    res.download(applicant.resume);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error downloading resume");
  }
});


const port = process.env.POR || 8100;
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
