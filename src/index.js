import express from "express";
import "dotenv/config";
import connectDb from "./db/connect.js";
import cors from "cors";
import companyRoute from "./routing/companyroute.js";
import reviewRoute from "./routing/reviewroute.js";
import path from "path";
const port = process.env.PORT;
const app = express();
connectDb();
app.use(express.json());
app.use(cors());
const __dirname = path.resolve();
app.use("/public", express.static(path.join(__dirname, "./public")));
//Routes
app.use("/company", companyRoute);
app.use("/review", reviewRoute);

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log(`Successfully run on port ${port}`);
});