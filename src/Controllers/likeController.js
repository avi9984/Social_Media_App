const Like=require('../Models/likeModel');
const Post=require('../Models/postModel');

const postLike=async (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).send({status:false, msg:error.massage})
    }
}