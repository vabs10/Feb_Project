import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

export const postApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Recruiter") {
    return next(new ErrorHandler("Recruiter can't access this!", 400));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume Required"));
  }
  const { resume } = req.files;
  const allowedFormats = ["application/pdf"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(new ErrorHandler("Invalid File type, please upload PDF", 400));
  }
  const cloudinaryRes = await cloudinary.v2.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryRes || cloudinaryRes.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryRes.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload to Cloudinary", 500));
  }
  const { name, email, coverLetter, number, jobId } = req.body;
  const applicantId = {
    user: req.user._id,
    role: "Applicant",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const recruiterId = {
    user: jobDetails.postedBy,
    role: "Recruiter",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !number ||
    !resume ||
    !applicantId ||
    !recruiterId
  ) {
    return next(new ErrorHandler("Please fill all details carefully!", 400));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    number,
    resume: {
      public_id: cloudinaryRes.public_id,
      url: cloudinaryRes.secure_url,
    },
    applicantId,
    recruiterId,
  });
  res.status(200).json({
    success: true,
    message: "Application Created!",
    application,
  });
});

export const recruiterApplications = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Applicant") {
    return next(new ErrorHandler("Applicant can't access this!", 400));
  }
  const { _id } = req.user;
  const applications = await Application.find({ "recruiterID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
});

export const applicantApplications = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Recruiter") {
    return next(new ErrorHandler("Recruiter can't access this!", 400));
  }
  const { _id } = req.user;
  const applications = await Application.find({ "applicantID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
});

export const applicantDeleteApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Recruiter") {
      return next(new ErrorHandler("Recruiter can't access this!", 400));
    }
    const { id } = req.params;
    const applications = await Application.findById(id);
    if (!applications) {
      return next(new ErrorHandler("Application not found", 404));
    }
    await Application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!!",
    });
  }
);

export const acceptApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Recruiter") {
    return next(
      new ErrorHandler("Only recruiters can perform this action!", 400)
    );
  }
  const { id } = req.params;
  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found", 404));
  }
  
  application.status = "Accepted";
  await application.save();
  res.status(200).json({
    success: true,
    message: "Application Accepted!",
    application,
  });
});

export const rejectApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Recruiter") {
    return next(
      new ErrorHandler("Only recruiters can perform this action!", 400)
    );
  }
  const { id } = req.params;
  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found", 404));
  }
  
  application.status = "Rejected";
  await application.save();
  res.status(200).json({
    success: true,
    message: "Application Rejected!",
    application,
  });
});
