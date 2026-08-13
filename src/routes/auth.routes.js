import express from 'express'
import authController from '../controller/auth.controller.js';
const userrouter = express.Router()
userrouter.post('/register',authController.userregister)
userrouter.post('/login',authController.userlogin)
userrouter.get('/test-mail',authController.testMail)
export default userrouter;