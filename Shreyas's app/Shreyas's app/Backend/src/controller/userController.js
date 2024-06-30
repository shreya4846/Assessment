const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../model/userModel");


const Register = (req, res) => {
    const { name, email, password, dob } = req.body;
    
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
            return res.status(500).send({ status: false, message: "Error hashing password" });
        }

        const isUniqueEmail = await User.findOne({ email: email })
        if (isUniqueEmail) {
            return res.status(400).send({ status: true, message: "EMAIL ALRADY REGISTER" })
        }

        const user = {
            name:name,
            email:email,
            password:hashedPassword,
            dob:dob
        }
        const newUser = await User.create(user);
        if(newUser){
            return res.status(200).send({ status: true, message: "User Registration Successful", data: newUser });
        }else{
            return res.status(500).send({ status: false, message: "Error inserting user data" });
        }

    });
};



const Login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const isUserExist = await User.findOne({ email: email });
        
        if (!isUserExist) {
            return res.status(400).send({ status: false, message: "Invalid Email / password" });
        }
        
        bcrypt.compare(password, isUserExist.password, (err, isPasswordMatched) => {
            if (err) {
                return res.status(500).send({ status: false, message: "Error comparing passwords", error: err });
            }

            if (isPasswordMatched) {
                // Remove the password field from isUserExist
                isUserExist.password = undefined;

                const expirationTime = Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60; // 90 days * 24 hours * 60 minutes * 60 seconds
                const token = jwt.sign({
                    userId: isUserExist._id,
                    iat: Math.floor(Date.now() / 1000),
                    exp: expirationTime
                }, process.env.TOKEN_KEY);

                return res.status(200).send({ status: true, message: "User Login Successful", token: token, data: isUserExist });
            } else {
                return res.status(401).send({ status: false, message: "Invalid email / password" });
            }
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: "Error retrieving user data", error: error });
    }
};



// const getUsers = (req, res) => {

//     console.log(req.data)

//     const sql = "SELECT name, email, dob FROM users";

//     db.query(sql, (err,result) => {
//         if (err) {
//             return res.status(500).send({ status: false, message: "Error occurred", error: err });
//         }
//         return res.status(200).send({ status: true, message: "User data", data: result });
//     })
// };

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ success: true, message: "All users retrieved successfully", data: users });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error occurred while fetching users", error: error });
    }
};




module.exports = {Login, Register, getUsers};