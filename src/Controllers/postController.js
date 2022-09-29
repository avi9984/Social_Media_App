const User=require('../Models/userModel');
const Post=require('../Models/postModel');


const createPost=async (req,res)=>{
    try {
        let data=req.body
        let userId=data.userId;
        const {title,description,isDeleted}=data
        if(!userId){
            return res.status(400).send({status:false, msg:"userId is required"})
        }
        let availableUserId=await User.findById(userId);

        if(!availableUserId){
            return res.status(400).send({status:false, msg:"User is not available"})
        }
        if(!title){
            return res.status(400).send({status:false, msg:"title is required"})
        }
        if(!description){
            return res.status(400).send({status:false, msg:"Description is required"})
        }
        if(isDeleted===true){
            return res.status(400).send({status:false, msg:"post is already deleted"})
        }
        let createPost= await Post.create(data).select({userId:0,commentCount:0,likeCount:0,deleteAt:0,isDeleted:0})
        createPost.postCount++
        return res.status(201).send({status:true, data:createPost}) 
        
    } catch (error) {
        console.log(error)
        res.status(500).send({status:false, msg:error.message})
    }
}

const deletePost=async (req,res)=>{
    try {
        const postId=req.params.postId;
        const post=await Post.findById(postId);
        if(!post){
            return res.status(404).send({status:false, msg:"No post exist"})
        }

        if(post.isDeleted===true){
            return res.status(400).send({status:false, msg:"no exist or already deleted post"})
        }

        await Post.updateOne({_id:postId},{isDeleted:true});
        await User.updateMany({postId:postId},{isDeleted:true})
        res.status(200).send({status:true, msg:"Post deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({status:false, msg:error})
    }
}


module.exports={createPost,deletePost}