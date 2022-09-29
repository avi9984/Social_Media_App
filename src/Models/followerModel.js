const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

const follwerSchema=new mongoose.Schema({
    user:{type:ObjectId, ref:"User_Profile"},

    follower:{type:ObjectId, ref:"User_Profile"},

    createdAt:{type:Date, default:Date.now},

    updatedAt:{type:Date, default:Date.now}
},{timestamps:true})

module.exports=mongoose.model("Follower",follwerSchema);