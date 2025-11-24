import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./routes/EmployeeRoutes.js";
import doctorRoutes from "./routes/DoctorRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
// Test route
app.get("/", (req, res) => res.send("API running..."));
app.use("/api", employeeRoutes);
app.use("/api", doctorRoutes);


const PORT =  process.env.PORT || 3300;
export default app;


