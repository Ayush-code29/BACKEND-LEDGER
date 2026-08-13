import express from 'express'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken';
import { sendWelcomeEmail } from "../utils/mail.js";
async function userregister(req, res) {
    const { email, password, name } = req.body;

    // Check if user already exists
    const isexist = await User.findOne({ email });

    if (isexist) {
        return res.status(400).json({
            message: "User already exists",
            status: "failed",
        });
    }

    // Create new user
    const user = await User.create({
        email,
        password,
        name,
    });

    // Generate JWT Token
    const token = jwt.sign(
        { userid: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    );

    // Send Welcome Email (Don't fail registration if email fails)
    try {
        await sendWelcomeEmail(user.email, user.name);
        console.log("Welcome email sent successfully");
    } catch (error) {
        console.log("Email Error:", error.message);
    }

    // Save token in cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,      // true in production
        sameSite: "lax",
    });

    // Response
    return res.status(201).json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        message: "User created successfully",
        status: "success",
    });
}
async function userlogin(req,res){
    const {email,password} = req.body
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return res.status(401).json({
            message:"Email id or password is invalid"
        })
    }
    const isvalid = await user.comparepassword(password)
    if(!isvalid){
        return res.status(401).json({
            message:"Email id or password is invalid"
        })
    }
    const token = jwt.sign({userid:user._id},process.env.JWT_SECRET,{expiresIn:'3d'})
    res.cookie("token",token)
    res.status(200).json({
        user:{
            _id:user._id,
            email:user.email,


        },
        message:"User login successfully",
        status:"success"
    })


}
const testMail = async (req, res) => {
    await sendEmail(
        "YOUR_GMAIL@gmail.com",   // yahan apna email likho
        "Testing MANIT Tube",
        `
        <h1>Hello Ayush 👋</h1>
        <p>Your Nodemailer setup is working successfully.</p>
        `
    );

    return res.status(200).json({
        success: true,
        message: "Email Sent Successfully"
    });
};
export default {userregister,userlogin,testMail}