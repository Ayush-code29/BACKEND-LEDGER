import express from 'express'
import authmiddleware from '../middleware/auth.middleware.js';
import accountController from '../controller/account.controller.js';
const accountrouter = express.Router();
accountrouter.post('/',authmiddleware.authmiddleware,accountController.createaccount)
export default accountrouter