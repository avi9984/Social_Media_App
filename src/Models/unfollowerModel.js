const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;

const unFollowerSchema=new mongoose.Schema({
    user:{type:ObjectId, ref:"User_Profile",require:true},

    unfollower:{type:ObjectId, ref:"User_Profile"},

    createdAt:{type:Date, default:Date.now},

    updatedAt:{type:Date, default:Date.now}
},{timestamps:true});

module.exports= mongoose.model('Unfollower', unFollowerSchema)