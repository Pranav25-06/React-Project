const mysql = require("mysql2/promise");
const fs = require("fs");
const bcrypt = require("bcrypt");
const connection = require("../utils/dbconnect")

async function insertUsers() {
  try {
    // 1️⃣ Read JSON file
    const users = JSON.parse(fs.readFileSync("users.json"));

    
    

    console.log("Connected to MySQL");

    for (const user of users) {

      // 🔐 Hash password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const sql = `
        INSERT INTO employees 
        (id, email, password, full_name, address, image, designation)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      await connection.execute(sql, [
        user.id,
        user.email,
        hashedPassword,  // ✅ storing hashed password
        user.full_name,
        user.address,
        user.image,
        user.designation
      ]);
    }

    console.log("All users inserted successfully with hashed passwords!");
    

  } catch (err) {
    console.error("Error:", err);
  }
}

insertUsers();