import Rating from "../modals/ReviewModal.js";
import Joi from "joi";

const ratingSchema = Joi.object({
  subject: Joi.string().required(),
  reviewText: Joi.string().required(),
  fullName: Joi.string().required(),

  rating: Joi.string(),
});
export const addReview = async (req, res) => {
  try {
    const {subject, reviewText, fullName, rating, id} = req.body;

    const {error, value} = ratingSchema.validate({
      subject,
      reviewText,
      fullName,
      rating,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const addRating = await new Rating({
      companyId: id,
      reviewText,
      fullName,
      subject,
      rating,
    });
    await addRating.save();
    res.status(201).json({
      message: "review added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
