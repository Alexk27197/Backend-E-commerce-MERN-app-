import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("DB Success");
    })
    .catch((err) => console.log("DB Error:", err));
};
