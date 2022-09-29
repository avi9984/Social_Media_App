const express=require('express');
const router=express.Router()
const User=require('../Controllers/userController')
const Follower=require("../Controllers/followerController");
const Unfollower=require("../Controllers/unfollowerController");


// user profile
router.post('/userProfile',User.createProfile)
router.post('/loginUser', User.loginUser)
router.get('/getUser',User.getUser)

//user follower & unfollower
router.post('/follower', Follower.follower);
router.post('/unfollower', Unfollower.unfollowers)

module.exports=router