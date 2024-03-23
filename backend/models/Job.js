const mongoose = require("mongoose");

let jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    noOfOpenPositions: {
      type: Number,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    activeApplications: [
      {
        type: mongoose.Schema.Types.ObjectId, //How many JobApplicant have applied for this position
        ref: "JobApplicantInfo", // Assuming the model name for job applicants is JobApplicantInfo
      }
    ],
    Rating: {
      type: Number,
      default: -1.0,
      validate: {
        validator: function (v) {
          return v >= -1.0 && v <= 5.0;
        },
        msg: "Invalid rating",
      },
    },
  },
  { collation: { locale: "en" } }
);

// module.exports = mongoose.model("Job", jobSchema);

const JobSchema = mongoose.model("Job", jobSchema);

module.exports= {JobSchema};
