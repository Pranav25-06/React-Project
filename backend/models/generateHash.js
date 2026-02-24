// adminPassword.js
const bcrypt = require("bcrypt");

const plainPassword = "admin@gmail.com"; // your hardcoded admin password
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log("Hashed password:", hash);
});