const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Recruiter', 'Applicant'],
      required: true
    }
  },
  { timestamps: true }
);

// module.exports = mongoose.model("User", userSchema);

const User = mongoose.model("User", userSchema);

module.exports= {User};