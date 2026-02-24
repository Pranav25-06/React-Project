const connection = require("../utils/dbconnect.js");


// ✅ CREATE USER
exports.createUser = (data, callback) => {
    const query = `
        INSERT INTO employees 
        (full_name, address, email, password, image, designation)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        query,
        [
            data.full_name,
            data.address,
            data.email,
            data.password,
            data.image,
            data.designation
        ],
        callback
    );
};



// ✅ FIND BY ID
exports.findById = (id, callback) => {
    const sql = "SELECT id, full_name, email, password FROM employees WHERE id = ?";
connection.query(sql, [id], (err, result) => {
  if (err) return callback(err);
  callback(null, result[0]); // result[0].password must exist
});
};



// ✅ FIND BY EMAIL
exports.findByEmail = (email, callback) => {
    connection.query(
        "SELECT * FROM employees WHERE email = ?",
        [email],
        callback
    );
};



// ✅ GET ALL USERS (without password)
exports.getAllUsers = (callback) => {
    connection.query(
        "SELECT id, full_name, email, address, image, designation FROM employees",
        (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        }
    );
};

exports.updateUser = (id, data, callback) => {
  const { fullname, email, address, designation } = data;
  const sql = `
    UPDATE employees
    SET full_name = ?, email = ?, address = ?, designation = ?
    WHERE id = ?
  `;

  connection.query(sql, [fullname, email, address, designation, id], (err, result) => {
    if (err) return callback(err);

    // Fetch updated user
    connection.query(
      "SELECT id, full_name, email, address, designation FROM employees WHERE id = ?",
      [id],
      (err2, rows) => {
        if (err2) return callback(err2);
        callback(null, rows[0]);
      }
    );
  });
};

exports.updatePassword = (id, hashedPassword, callback) => {
  connection.query(
    "UPDATE employees SET password = ? WHERE id = ?",
    [hashedPassword, id],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

exports.deleteUser = (id, callback) => {
  const sql = "DELETE FROM employees WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};