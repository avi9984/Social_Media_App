const { default: mongoose } = require('mongoose');
const Follower=require('../Models/followerModel');
const User=require('../Models/userModel');
const {isValid}=require('../utils/validation')

const follower=async (req,res)=>{
    try {
        const userId=req.params.userId;
        const followerId=req.params.followerId;
        if(!isValid(userId)){
            return res.status(400).send({status:false,msg:"user id not given"})
        }

        if(!mongoose.isValidObjectId(userId)){
            return res.status(400).send({status:false, msg:"Invalid userId"})
        }

        const findUserId=await User.findById(userId)
        if(!findUserId){
            return res.status(400).send({status:false, msg:"No data found"})
        }

        // res.status(200).send({status:true, msg:"Follower increase",data:findUserId})
        if(!isValid(followerId)){
            return res.status(400).send({status:false, msg:"follower id not given"})
        }
        if(!mongoose.isValidObjectId(followerId)){
            return res.status(400).send({status:false, msg:"Invalid followerId"})
        }

        const follower=await Follower.findById(followerId)
        if(!follower){
            return res.status(400).send({status:false, msg:"No data found"})
        }
        res.status(200).send({status:true, msg:"follower count",follower:{$inc:follower+1}})

    } catch (error) {
        console.log(error)
        res.status(500).send({status:false, msg:error.massage})
    }
}

module.exports={follower}