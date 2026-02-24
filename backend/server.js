const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
dotenv.config();

const authRoutes = require("./routes/authroutes");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", authRoutes);





// app.post("/api/signup",async (req,res)=>{
//     const {fullname,phone,email,password} = req.body;

//     if (!fullname?.trim() || !phone?.trim() || !email?.trim() || !password?.trim()) {
//         return res.json({
//             success: false,
//             message: "All fields are required"
//         });
//     }
//     try{
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const query = "INSERT INTO users (fullname,phone,email,password) VALUES (?, ?, ?, ?)"
//         connection.query(query, [fullname,phone,email,hashedPassword], (err, result) => {
//         if (err) {
//             console.log(err);
//             if (err.code === "ER_DUP_ENTRY") {
//                 return res.json({
//                     success: false,
//                     message: "Email already exists"
//                 });
//            }
//             return res.json({
//                 success: false,
//                 message: "Signup failed"
//             });
//         }

//         res.json({
//             success: true,
//             message: "Signup successful"
//         });
//     });
//     }
//     catch(error){
//         res.json({ success: false, message: "Server error" });
//     }
    
// })


// app.post("/api/login",(req,res)=>{
//     const {email,password} = req.body;
//     const query = "SELECT * FROM users WHERE email = ?"
//     connection.query(query, [email], async (err, result) => {
//         if (err || result.length == 0) {
//             console.log(err);
//             return res.json({
//                 success: false,
//                 message: "Invalid credentials"
//             });
//         }

//         const user = result[0];
//         const isMatch = await bcrypt.compare(password,user.password);
//         if(!isMatch){
//             return res.json({
//                 success: false,
//                 message: "invalid credentials"
//             });
//         }
//         const token = jwt.sign(
//             { id: user.id, email: user.email },
//             "MY_SECRET_KEY",
//             { expiresIn: "1h" }
//         );
//         res.json({
//             success: true,
//             message: "Login successful",
//             token: token
//         });
//     });
// })

// function verifyToken(req, res, next) {

//     const token = req.headers["authorization"];

//     if (!token) {
//         return res.status(403).json({ message: "Access denied" });
//     }

//     try {
//         const decoded = jwt.verify(token, "MY_SECRET_KEY");
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: "Invalid token" });
//     }
// }

// app.get("/api/user", verifyToken, (req, res) => {

//     const sql = "SELECT fullname FROM users WHERE id = ?";

//     connection.query(sql, [req.user.id], (err, results) => {

//         if (err || results.length === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json({
//             fullname: results[0].fullname
//         });
//     });
// });


app.listen(port,(req,res)=>{
    console.log("Server started");
})