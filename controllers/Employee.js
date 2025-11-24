import connection from "../config/db.js";

export const getAllEmployees = (req, res) => {
  const query = "SELECT * FROM doctors";
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ status: 0, message: "Database error", error: err });
    }
    res.status(200).json({ status: 1, message: "Employee data fetched", data: results });
  });
};
// GET all employees
// export const getAllEmployees = (req, res) => {
//   const query = "SELECT * FROM employee";
//   connection.query(query, (err, results) => {
//     if (err) {
//       return res.status(500).json({ status: 0, message: "Database error", error: err });
//     }
//     res.status(200).json({ status: 1, message: "Employee data fetched", data: results });
//   });
// };

// GET employee by ID
export const getEmployeeById = (req, res) => {
  const query = "SELECT * FROM employee WHERE emp_no = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ status: 0, message: "Database error", error: err });
    if (results.length === 0) return res.status(404).json({ status: 0, message: "Employee not found" });
    res.status(200).json({ status: 1, data: results[0] });
  });
};

// CREATE employee
export const createEmployee = (req, res) => {
  const { fname, lname, email, mobile, department, position, salary } = req.body;
  if (!fname || !lname || !email)
    return res.status(400).json({ status: 0, message: "First name, last name, email required" });

  const query = `INSERT INTO employee (fname, lname, email, mobile, department, position, salary)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, [fname, lname, email, mobile, department, position, salary], (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY")
        return res.status(400).json({ status: 0, message: "Email already exists" });
      return res.status(500).json({ status: 0, message: "Database error", error: err });
    }
    res.status(201).json({ status: 1, message: "Employee created", data: { emp_no: results.insertId, ...req.body } });
  });
};

// UPDATE employee
export const updateEmployee = (req, res) => {
  const empId = req.params.id;
  const { fname, lname, email, mobile, department, position, salary } = req.body;
  const query = `UPDATE employee SET fname=?, lname=?, email=?, mobile=?, department=?, position=?, salary=? WHERE emp_no=?`;
  connection.query(query, [fname, lname, email, mobile, department, position, salary, empId], (err, results) => {
    if (err) return res.status(500).json({ status: 0, message: "Database error", error: err });
    if (results.affectedRows === 0) return res.status(404).json({ status: 0, message: "Employee not found" });
    res.status(200).json({ status: 1, message: "Employee updated", data: { emp_no: empId, ...req.body } });
  });
};

// DELETE employee
export const deleteEmployee = (req, res) => {
  const empId = req.params.id;
  const query = "DELETE FROM employee WHERE emp_no = ?";
  connection.query(query, [empId], (err, results) => {
    if (err) return res.status(500).json({ status: 0, message: "Database error", error: err });
    if (results.affectedRows === 0) return res.status(404).json({ status: 0, message: "Employee not found" });
    res.status(200).json({ status: 1, message: "Employee deleted" });
  });
};
