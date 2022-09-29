
const User=require('../Models/userModel');
const {isValidBody,validEmail,validPwd,validString,isValid}=require('../utils/validation')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const { response } = require('express');


const createProfile= async (req,res)=>{
    try {
        let data=req.body;

        let {userName,email,password}=data
        if(isValidBody(data)){
            return res.status(400).send({status:false, msg:"Enter user details"})
        }

        if(!userName){
            return res.status(400).send({status:false, msg:"User name is require"})
        }

        if(!email){
            return res.status(400).send({status:false, msg:"email is required"})
        }

        if(!password){
            return res.status(400).send({status:false, msg:"password is required"})
        }

        if(validEmail(email)){
            return res.status(400).send({status:false, msg:"enter valid email"})
        }
        if(validPwd(password)){
            return res.status(400).send({status:false, msg:"valid password"})
        }

        let duplicateEmail=await User.findOne({email:email})
        if(duplicateEmail){
            return res.status(400).send({status:false, msg:"email is already exist"})
        }
        data.password = await bcrypt.hash(data.password, 10);

        let userData=await User.create(data)
        res.status(201).send({status:true, msg:"User Profile Successfully created", data:userData})

    } catch (error) {
        console.log(error)
        res.status(500).send({status:false, msg: error.massage})
    }
}

const loginUser=async (req,res)=>{
    try {
        let data = req.body;

        //Validate the body
    
        if (isValidBody(data)) {
          return res .status(400).send({ status: false, message: "Enter user details" });
        }
    
        //Check the email
    
        if (!data.email) {
          return res.status(400).send({ status: false, message: "Email ID is required" });
        }
    
        //check the password
    
        if (!data.password) {
          return res.status(400).send({ status: false, message: "Password is required" });
        }
    
        //Validate the email
    
        if (validEmail(data.email)) {
          return res.status(400).send({ status: false, message: "Enter a valid email-id" });
        }
    
        //Validate the password
    
        if (validPwd(data.password)) {
          return res.status(400).send({ status: false, message: "Enter a valid password" });
        }
    
        //Email check
    
        const checkValidUser = await User.findOne({ email: data.email });
    
        if (!checkValidUser) {
          return res.status(400).send({ status: false, message: "Email Id is not correct " });
        }
    
        //Password check
    
        let checkPassword = await bcrypt.compare(data.password,checkValidUser.password);
    
        if (!checkPassword) {
          return res.status(400).send({ status: false, message: "Password is not correct" });
        }
    
        // token generation for the logged in user
    
        let token = jwt.sign({ userId: checkValidUser._id }, "Social_Media_App", {
          expiresIn: "1d",
        });
    
        //set token to the header
    
        res.setHeader("x-api-key", token);
    
    res.status(200).send({status:true, msg:"Successfully Login",data:token});
      } catch (err) {
        res.status(500).send({status:false, msg:err.message });
      }
    };
    

    const getUser=async (req,res)=>{
      try {
        const userId=req.params.userId;
        if(!isValid(userId)){
          return res.status(400).send({status:false, msg:"user id not given"})
        }

        if(!mongoose.isValidObjectId(userId)){
          return res.status(400).send({status:false, msg:"userId Invalid"})
        }

        const findUserId=await User.findById(userId).select({firstName:0, lastName:0,email:0, password:0, postCount:0, createdAt:0, deletedAt:0});

        if(!findUserId){
          return res.status(400).send({status:false, msg:"No data found"})
        }

        res.status(200).send({status:true, msg:"User Profile Details",data:findUserId});
      } catch (error) {
        console.log(error)
        res.status(500).send({status:false, msg:error.msg})
      }
    }

module.exports={createProfile,loginUser,getUser}