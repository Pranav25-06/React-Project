const fs = require("fs");

const users = [];

for (let i = 1; i <= 50; i++) {
  users.push({
    id: i,
    username: `user${i}`,
    password: `user${i}`,
    full_name: `User ${i}`,
    address: "Mumbai, India",
    image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i}.jpg`,
    designation: [
      "Software Engineer",
      "Backend Developer",
      "Frontend Developer",
      "UI/UX Designer",
      "DevOps Engineer",
      "QA Engineer",
      "HR Manager",
      "Data Analyst",
      "Project Manager",
      "Business Analyst"
    ][i % 10]
  });
}

fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

console.log("50 users generated successfully!");