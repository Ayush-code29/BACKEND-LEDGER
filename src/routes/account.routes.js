import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import accountController from "../controller/account.controller.js";
const accountRouter = express.Router();
accountRouter.post(
    "/",
    authMiddleware,
    accountController.createaccount
);
export default accountRouter;