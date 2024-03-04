const mongoose = require("mongoose");

let recruiterSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    }
  },
  { collation: { locale: "en" } }
);

// module.exports = mongoose.model("Recruiter", recruiterSchema);

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

module.exports= {Recruiter};
