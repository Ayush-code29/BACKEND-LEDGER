import mongoose from "mongoose";
const connectdb = async ()=>{
    try {
       const connectioninstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`\n MongoDB connected !! DB HOST:${connectioninstance.connection.host}`)
    } catch (error) {
        console.log("ERROR:",error)
        process.exit(1)
    }
}
export default connectdb