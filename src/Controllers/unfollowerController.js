const User=require('../Models/userModel')
const Unfollower=require('../Models/unfollowerModel')
const {isValid}=require('../utils/validation');
const { default: mongoose } = require('mongoose');

const unfollowers=async (req,res)=>{
    try {
        const userId=req.params.userId;
        const unfollowerId=req.params.unfollowerId;

        if(!isValid(userId)){
            return res.status(400).send({status:false, msg:"no data given"})
        }

        if(!mongoose.isValidObjectId(userId)){
            return res.status(400).send({status:false, msg:"invalid user id"})
        }
        let findUserId=await User.findById(userId);
        if(!findUserId){
            return res.status(400).send({status:false, msg:"no data found"})
        }

        if(!isValid(unfollowerId)){
            return res.status(400).send({status:false, msg:"no unfollower"})
        }

        if(!mongoose.isValidObjectId(unfollowerId)){
            return res.status(400).send({status:false, msg:"invalid unfollwer"})
        }

        const findUnfollower=await Unfollower.findById(unfollowerId);
        if(!findUnfollower){
            return res.status(400).send({status:false, msg:"no unfooler data found"})
        }
        res.status(200).send({status:false, msg:"Decrese the follower", findUnfollower:{$inc:findUnfollower-1}})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({status:false, msg:error.massage})
    }
}

module.exports={unfollowers}