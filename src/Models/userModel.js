const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName:{type:String, require:true, trim:true},

    lastName:{type:String, trim:true},

    userName: { type: String, trim: true, require: true, min: 3, max: 20 },

    email: { type: String, trim: true, require: true, unique: true, max: 50 },

    password: { type: String, require: true, trim: true, min: 8 },

    followersCount: { type: Number, default: 0 },

    followingsCount: { type: Number, default: 0 },

    postCount:{type:Number, default:0},

    createdAt:{type:Date, default:Date.now},

    updatedAt:{type:Date, default:Date.now}

  },{ timestamps: true });

module.exports = mongoose.model("User_Profile", userSchema);
