const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

const commentSchema=new mongoose.Schema({
    comment:{type:String, require:true, trim:true},
    user:{type:ObjectId, ref:"User_Profile", trim:true},
    post:{type:ObjectId, ref:"Post", trim:true},
    likeCount:{type:Number, default:0},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}
},{timestamps:true})

module.exports=mongoose.model("Comments",commentSchema)