const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");
const jwt = require('jsonwebtoken')
 const bcrypt = require("bcrypt")



const VideoSchema = new Schema(
  {
    video: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // Assuming duration is in seconds
      required: true,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Video", VideoSchema);
