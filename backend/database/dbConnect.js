import mongoose from "mongoose";
 
export const dbConnect = () => {
  mongoose
    .connect(process.env.MDB_URI, {
      dbName: "JobPortal",
    })
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log("Error connecting to DB", err));
};
