import mongoose from "mongoose";
export default function connectDb() {
  mongoose
    .connect("mongodb://localhost:27017/ReviewRating")
    .then((res) => {
      console.log("db connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}
