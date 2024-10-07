import express from "express";
import {
    getCompanyList,
    addCompany,
    getSingleCompany,
} from "../controllers/companyController.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();

router.get("/", getCompanyList);
router.post("/", upload.single("image"), addCompany);
router.get("/single-company/:id", getSingleCompany);

export default router;