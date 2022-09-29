const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId

const postSchema=new mongoose.Schema({

    title:{ type:String, require:true, trim:true},

    description:{ type:String, require:true, trim:true, max:500},

    userId:{ type:ObjectId, require:true, trim:true, ref:"User_Profile"},

    commentCount:{ type:Array, default:0},

    likeCount:{ type:Number, default:0 },
    
    deleteAt:{ type:Date , default:Date.now },
    
    isDeleted:{ type:Boolean, default:false },

    createdAt:{type:Date, default:Date.now}

},{timestamps:true});

module.exports=mongoose.model("Post",postSchema)