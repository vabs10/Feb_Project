const mongoose = require("mongoose");

let ratingSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['Recruiter', 'Applicant'],
      required: true
    },
    ratingNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    fromId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'category' //'Recruiter', 'Applicant'
    },
    toId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'category' //'Recruiter', 'Applicant'
    }
  },
  { timestamps: true }


);
module.exports = mongoose.model("Rating", ratingSchema);

const Rating = mongoose.model("Rating", ratingSchema);

module.exports= {Rating};