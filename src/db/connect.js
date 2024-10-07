import mongoose from "mongoose";
export default function connectDb() {
  const mongodbUrl = process.env.MONGO_DB_URL;
  mongoose
    .connect(mongodbUrl)
    .then((res) => {
      console.log("db connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}
