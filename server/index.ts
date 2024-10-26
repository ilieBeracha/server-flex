import express from "express";
import dotenv from "dotenv";
import AdminRoute from "./3-routes/adminRoute";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/admin", AdminRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
