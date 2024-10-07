import mongoose from "mongoose";
const ratingTable = mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

const Rating = mongoose.model("Rating", ratingTable);
export default Rating;
