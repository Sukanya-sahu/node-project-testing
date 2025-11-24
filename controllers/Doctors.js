import { DoctorModel } from "../models/DoctorModel.js";

export const list = (req, res) => {
  DoctorModel.list((err, results) => {
    if (err) {
      log_message('error', `* CB-API * Doctor.list ${err.message}`);
      return res.status(500).json({ status: 0, message: "Database error", error: err.message, data: null });
    }
    res.status(200).json({ status: 1, message: "Doctors fetched successfully", error: null, data: results });
  });
};

export const view = (req, res) => {
  const { id } = req.query; 
  
  
  // Required parameter check
  if (!id) {
    return res.status(400).json({ status: 0, message: "Doctor ID is required", error: "Missing id parameter", data: null });
  }

  DoctorModel.view(id, (err, results) => {
    if (err) {
      log_message('error', `* CB-API * Doctor.view ${err.message}`);
      return res.status(500).json({ status: 0, message: "Doctor not found", error: err.message, data: null });
    }
    if (results.length === 0) {
      return res.status(404).json({ status: 0, message: "Doctor not found", error: "No doctor found with given ID", data: null });
    }
    res.status(200).json({ status: 1, message: "Doctor fetched successfully", error: null, data: results[0] });
  });
};

export const add = (req, res) => {
  const data = req.body;
  
  // Required parameter check
  if (!data.first_name || !data.last_name || !data.email) {
    return res.status(400).json({ status: 0, message: "First name, last name, and email are required", error: "Missing required fields", data: null });
  }

  // Form validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return res.status(400).json({ status: 0, message: "Please provide a valid email address", error: "Invalid email format", data: null });
  }

  DoctorModel.add(data, (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        log_message('error', `* CB-API * Doctor.add Duplicate entry for email: ${data.email}`);
        return res.status(409).json({ status: 0, message: "Doctor with this email already exists", error: "Duplicate email entry", data: null });
      }
      log_message('error', `* CB-API * Doctor.add ${err.message}`);
      return res.status(500).json({ status: 0, message: "Database error", error: err.message, data: null });
    }
    log_message('info', `* CB-API * Doctor.add Doctor created with ID: ${results.insertId}`);
    res.status(201).json({ status: 1, message: "Doctor created successfully", error: null, data: { id: results.insertId, ...data } });
  });
};

export const update = (req, res) => {
  const { id } = req.query; 
  const data = req.body;

  // Required parameter check
  if (!id) {
    return res.status(400).json({ status: 0, message: "Doctor ID is required", error: "Missing id parameter", data: null });
  }

  DoctorModel.update(id, data, (err, results) => {
    if (err) {
      log_message('error', `* CB-API * Doctor.update ${err.message}`);
      return res.status(500).json({ status: 0, message: "Database error", error: err.message, data: null });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ status: 0, message: "Doctor not found", error: "No doctor found with given ID", data: null });
    }
    log_message('info', `* CB-API * Doctor.update Doctor updated with ID: ${id}`);
    res.status(200).json({ status: 1, message: "Doctor updated successfully", error: null, data: { id, ...data } });
  });
};

export const remove = (req, res) => {
  const { id } = req.query; 

  // Required parameter check
  if (!id) {
    return res.status(400).json({ status: 0, message: "Doctor ID is required", error: "Missing id parameter", data: null });
  }

  DoctorModel.delete(id, (err, results) => {
    if (err) {
      log_message('error', `* CB-API * Doctor.delete ${err.message}`);
      return res.status(500).json({ status: 0, message: "Database error", error: err.message, data: null });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ status: 0, message: "Doctor not found", error: "No doctor found with given ID", data: null });
    }
    log_message('info', `* CB-API * Doctor.delete Doctor deleted with ID: ${id}`);
    res.status(200).json({ status: 1, message: "Doctor deleted successfully", error: null, data: null });
  });
};

// Helper function for logging
function log_message(level, message) {
  console.log(`[${level.toUpperCase()}] ${message}`);
}