import mongoose from "mongoose";
const accountschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        index:true,
    },
    status:{
        enum:{
            values:["ACTIVE","FROZEN","CLOSED"],
            message:"Status can be either ACTIVE, FROZEN OR CLOSED",
            default:"ACTIVE"
        }
    },
    currency:{
        type:String,
        required:true,
        default:"INR"
    }
},{timestamps:true})
const accountmodel = mongoose.model("account",accountschema)
export default accountmodel