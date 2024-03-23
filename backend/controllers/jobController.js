import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Job } from "../models/jobSchema.js";

export const allJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Applicant") {
    return next(new ErrorHandler("Applicant can't make a Job Posting", 400));
  }
  const { title, description, category, country, city, salaryFrom, salaryTo } =
    req.body;
  if (
    !title ||
    !description ||
    !category ||
    !country ||
    !city ||
    !salaryFrom ||
    !salaryTo
  ) {
    return next(
      new ErrorHandler("Please Provide all details in Job Posting", 400)
    );
  }
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    salaryFrom,
    salaryTo,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job posted Successfully",
    job,
  });
});

export const myJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Applicant") {
    return next(new ErrorHandler("Applicant can't access this", 400));
  }

  const myJobs = await Job.find({ postedBy: req.user._id });

  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const editJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Applicant") {
    return next(new ErrorHandler("Applicant can't access this", 400));
  }
  const { id } = req.params;

  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found", 404));
  }

  if (job.postedBy.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You are not authorized to edit this job", 403));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Job Updated!!",
    job,
  });
});

export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Applicant") {
    return next(new ErrorHandler("Applicant can't access this", 400));
  }

  const { id } = req.params;

  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found", 404));
  }
  if (job.postedBy.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You are not authorized to delete this job", 403));
  }
  await Job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!!",
  });
});
