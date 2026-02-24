const authService = require("../services/authservice");
const userModel = require("../models/usermodel");


// 🔐 SIGNUP
exports.signup = async (req, res) => {
    try {
        const response = await authService.signupService(req.body);

        if (!response.success) {
            return res.status(400).json(response);
        }

        return res.status(201).json(response);

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


// 🔐 LOGIN
exports.login = async (req, res) => {
    try {
        const response = await authService.loginService(req.body);

        if (!response.success) {
            return res.status(401).json(response);
        }

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


// 👤 GET CURRENT LOGGED-IN USER
exports.getUser = async (req, res) => {
    try {
        // IMPORTANT: your verifyToken middleware must set req.user
        const email = req.user.email;

        userModel.findByEmail(email, (err, result) => {
            if (err || result.length === 0) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            return res.status(200).json({
                success: true,
                full_name: result[0].full_name,
                email: result[0].email
            });
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


// 👥 GET ALL USERS (Protected)
exports.getAllUsers = async (req, res) => {
    try {
        console.log("authservice");
        const response = await authService.getAllUsers();
        console.log(response.data[0]);
        if (!response.success) {

            return res.status(500).json(response);
        }

        return res.json(response);

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id; // get ID from URL
    const { fullname, email, address, designation } = req.body;

    // Validate ID
    if (!id || id === "undefined") {
      return res.status(400).json({ success: false, message: "Valid user ID is required" });
    }

    // Call service and pass only data needed
    const updatedUser = await authService.updateUser(id, { fullname, email, address, designation });

    // Send response once
    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const userId = req.employee.id; // get ID from JWT
    const { currentPassword, newPassword } = req.body;

    // Call your service to check current password & update
    const result = await authService.updatePassword(userId, currentPassword, newPassword);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    // Only admin can delete
    if (!req.employee || req.employee.email !== "admin@gmail.com") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID required" });
    }

    const response = await authService.deleteUser(userId);

    if (!response.success) {
      return res.status(500).json(response);
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};