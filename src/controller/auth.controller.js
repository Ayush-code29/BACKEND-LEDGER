import express from 'express'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken';
async function userregister(req,res){
    const {email,password,name} = req.body;
    const isexist = await User.findOne({email:email})
    if(isexist){
        return res.status(400).json({
            message:"User already exist",
            status:"failed"
        })
    }
    const user = await User.create({email,password,name})
    const token = jwt.sign({userid:user._id},process.env.JWT_SECRET,{expiresIn:'3d'})
    res.cookie("token",token)
    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,


        },
        message:"User created successfully",
        status:"success"
    })
}
async function userlogin(req,res){
    const {email,password} = req.body
    const user = await User.findOne({email})
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
export default {userregister,userlogin}