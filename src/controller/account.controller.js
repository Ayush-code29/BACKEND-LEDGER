import accountmodel from "../models/account.model.js";
async function createaccount(req,res){
    const user = req.user;
    const account = await accountmodel.create({user:user._id})
    res.status(201).json({account})
}
export default {createaccount}