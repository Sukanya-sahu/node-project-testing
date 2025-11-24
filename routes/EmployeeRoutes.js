import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/Employee.js";

const router = express.Router();

router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

export default router;
