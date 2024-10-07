import mongoose from "mongoose";
const companyTable = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    founded: {
        type: Date,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
});

const Company = mongoose.model("Company", companyTable);
export default Company;