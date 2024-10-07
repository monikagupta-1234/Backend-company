import Company from "../modals/CompanyModal.js";
import Joi from "joi";
import Rating from "../modals/ReviewModal.js";
import mongoose from "mongoose";
const companySchema = Joi.object({
  companyName: Joi.string().required(),
  location: Joi.string().required(),
  founded: Joi.string().required(),
  city: Joi.string().required(),
  logo: Joi.string().optional(),
});
export const getCompanyList = async (req, res) => {
  try {
    const {sort, city} = req.query;

    let filter = {};
    if (city) {
      filter.city = {$regex: city, $options: "i"};
    }
    let sortOption = {};
    if (sort === "asc") {
      sortOption.companyName = 1;
    } else if (sort === "desc") {
      sortOption.companyName = -1;
    } else {
      sortOption.companyName = 1;
    }

    const companyList = await Company.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "companyId",
          as: "ratings",
        },
      },
      {
        $addFields: {
          averageRating: {$avg: "$ratings.rating"},
        },
      },
      {
        $sort: sortOption,
      },
    ]);

    res.status(200).json({
      companyList,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addCompany = async (req, res) => {
  try {
    const {error, value} = companySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        success: false,
      });
    }

    const company = await new Company({
      companyName: value.companyName,
      location: value.location,
      founded: value.founded,
      city: value.city,
      logo: req.file ? req.file.filename : "",
    });
    await company.save();
    res.status(201).json({
      message: "Company added successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getSingleCompany = async (req, res) => {
  try {
    const {id} = req.params;

    const singleCompany = await Company.aggregate([
      {
        $match: {_id: new mongoose.Types.ObjectId(id)},
      },
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "companyId",
          as: "ratings",
        },
      },
      {
        $addFields: {
          averageRating: {$avg: "$ratings.rating"},
        },
      },
    ]);
   
    if (singleCompany.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      singleCompany: singleCompany[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
