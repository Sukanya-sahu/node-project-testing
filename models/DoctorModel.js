import connection from "../config/db.js";

export const DoctorModel = {
  list: (callback) => {
    const query = "SELECT * FROM doctors";
    connection.query(query, callback);
  },

  view: (id, callback) => {
    const query = "SELECT * FROM doctors WHERE id = ?";
    connection.query(query, [id], callback);
  },

  add: (data, callback) => {
    const query = `
      INSERT INTO doctors 
      (first_name, last_name, gender, phone_number, email, language, profile_image, specialization, specialization_id, others_specialization,create_datetime)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;
    data.create_datetime = new Date(); 
    const values = [
      data.first_name,
      data.last_name,
      data.gender,
      data.phone_number,
      data.email,
      data.language,
      data.profile_image,
      data.specialization,
      data.specialization_id,
      data.others_specialization,
      data.create_datetime,
    ];
    connection.query(query, values, callback);
  },

  update: (id, data, callback) => {
    const query = `
      UPDATE doctors SET 
        first_name=?, last_name=?, gender=?, phone_number=?, email=?, 
        language=?, profile_image=?, specialization=?, specialization_id=?, others_specialization=? 
      WHERE id=?
    `;
    const values = [
      data.first_name,
      data.last_name,
      data.gender,
      data.phone_number,
      data.email,
      data.language,
      data.profile_image,
      data.specialization,
      data.specialization_id,
      data.others_specialization,
      id
    ];
    connection.query(query, values, callback);
  },

  delete: (id, callback) => {
    const query = "DELETE FROM doctors WHERE id = ?";
    connection.query(query, [id], callback);
  },
};
