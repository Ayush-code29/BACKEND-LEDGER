import mongoose from "mongoose";

const transactioinschema = new mongoose.Schema({
    fromaccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:true,
        index:true
    },
    toaccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:true,
        index:true

    },
    status:{
        type:String,
        enum:{
            values:["PENDING","COMPLETED","FAILED","REVERSED"],
            message:"Status can be either PENDING, COMPLETED, FAILED OR REVERSED",
        },
        default:"PENDING"
    },
    amount:{
        type:Number,
        required:true,
        min:0
    },
    idempotencykey:{
        type:String,
        required:true,
        index:true,
        unique:true,
    },
},{timestamps:true})
const transactionmodel = mongoose.model("transaction",transactioinschema)
export default transactionmodel