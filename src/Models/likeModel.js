const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const postLikeSchema = new mongoose.Schema(
  {
    post: { type: ObjectId, require: true, ref: "Post" },

    user: { type: ObjectId, require: true, ref: "User_Profile" },

    createdAt: { type: Date, default: Date.now },

    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostLike", postLikeSchema);
