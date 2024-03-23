const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: String, // Changed to String
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String, // Added
      required: true,
    },
    education: [
      {
        degree: {
          type: String, // Added
          required: true,
        },
        institutionName: {
          type: String,
          required: true,
        },
        startYear: {
          type: Number,
          min: 1930,
          max: new Date().getFullYear(),
          required: true,
          validate: Number.isInteger,
        },
        endYear: {
          type: Number,
          max: new Date().getFullYear(),
          validate: [
            { validator: Number.isInteger, msg: "Year should be an integer" },
            {
              validator: function (value) {
                return this.startYear <= value;
              },
              msg: "End year should be greater than or equal to Start year",
            },
          ],
        },
      },
    ],
    skills: [String],
    Rating: { // Changed to Rating
      type: Number,
      max: 5.0,
      default: -1.0,
      validate: {
        validator: function (v) {
          return v >= -1.0 && v <= 5.0;
        },
        msg: "Invalid rating",
      },
    },
    resume: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  { collation: { locale: "en" } }
);

// module.exports = mongoose.model("JobApplicantInfo", schema);

const JobApplicant = mongoose.model("JobApplicantInfo", schema);

module.exports= {JobApplicant};
