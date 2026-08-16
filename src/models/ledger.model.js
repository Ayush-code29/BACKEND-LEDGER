import mongoose from "mongoose";

const ledgerschema = new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:true,
        index:true,
        immutable:true
    },
    amount:{
        type:Number,
        required:true,
        immutable:true,
    },
    transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"transaction",
        required:true,
        index:true,
        immutable:true
    },
    type:{
        type:String,
        enum:{
            values:["CREDIT","DEBIT"]
        },
        required:true,
        immutable:true,
    }
},{timestamps:true})

function preventledgermodification(){
    throw new Error("Ledger entries are immutable and can not be deleted or modified")
}
ledgerschema.pre("findOneAndUpdate",preventledgermodification)

const ledgermodel = mongoose.model('ledger',ledgerschema)
export default ledgermodel