const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel");

exports.signupService = async (body, callback) => {
    try {
        const { fullname, address, email, password } = body;

        // Validate input
        if (!fullname?.trim() || !address?.trim() || !email?.trim() || !password?.trim()) {
            return callback({ success: false, message: "All fields required" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Use YOUR model exactly as it is
        userModel.createUser(
            [fullname.trim(), address.trim(), email.trim(), hashedPassword],
            (err) => {

                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return callback({ success: false, message: "Email already exists" });
                    }
                    console.log(err);
                    return callback({ success: false, message: "Signup failed" });
                }

                // Generate JWT
                const token = jwt.sign(
                    { email },
                    "MY_SECRET_KEY",
                    { expiresIn: "1h" }
                );

                return callback({
                    success: true,
                    message: "Signup successful",
                    token,
                    fullname
                });
            }
        );

    } catch (error) {
        console.log(error);
        return callback({ success: false, message: "Server error" });
    }
};

exports.loginService = async (body) => {
    try {
        const { email, password } = body;

        if (!email?.trim() || !password?.trim()) {
            return { success: false, message: "Email and password required" };
        }

        const result = await new Promise((resolve, reject) => {
            userModel.findByEmail(email.trim(), (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!result || result.length === 0) {
            return { success: false, message: "Invalid email. Please register first." };
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return { success: false, message: "Wrong password" };
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            "MY_SECRET_KEY",
            { expiresIn: "1h" }
        );

        return {
            success: true,
            message: "Login successful",
            user: user,
            token
        };

    } catch (error) {
        console.log(error);
        return { success: false, message: "Server error" };
    }
};

exports.getAllUsers = async () => {
    try {
        const users = await new Promise((resolve, reject) => {
            userModel.getAllUsers((err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return {
            success: true,
            data: users
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to fetch users"
        };
    }
};

exports.updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    userModel.updateUser(id, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



exports.updatePassword = async (userId, currentPassword, newPassword) => {
  try {
    // 1️⃣ Get user from DB
    const user = await new Promise((resolve, reject) => {
      userModel.findById(userId, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    
    if (!user) {
      return { success: false, message: "User not found" };
    }
    console.log(user.password);
    // 2️⃣ Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return { success: false, message: "Current password is incorrect" };
    }

    // 3️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4️⃣ Update password in DB
    await new Promise((resolve, reject) => {
      userModel.updatePassword(userId, hashedPassword, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update password" };
  }
};

exports.deleteUser = async (userId) => {
  try {
    await new Promise((resolve, reject) => {
      userModel.deleteUser(userId, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete user" };
  }
};