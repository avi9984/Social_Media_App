
const jwt=require('jsonwebtoken')
const User=require('../Models/userModel')
const {isValidObjectId}=require('../utils/validation')
const authentication=(req,res,next)=>{
    try {
        let token=req.header["x-api-key"]
        if(!token){
            token=req.header["X-api-key"];
        }
        if(!token){
            return res.status(400).send({status:false, msg:"token is missing"})
        }

        let decodedToken=jwt.verify(token, "Social_Media_App")
        if(!decodedToken){
            return res.status(401).send({status:false, msg:"token is not valid"})

        }
        req.decodedToken=decodedToken;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({status:false, msg:error.massage})
    }
}

// const authorization= async(req,res,next)=>{
//     try {
//         let loggedInUser=req.decodedToken.userId;
//         let userLogging;

//         if(req.body.hasOwnProperty("userId")){
//             if(!isValidObjectId(req.body.userId)){
//                 return res.status(400).send({status:false, msg:"enter a valid user id"})
//             }
//             let userData=await User.findById(req.body.userId)
//             if(!userData){}
//         }
//     } catch (error) {
        
//     }
// }

module.exports={authentication}