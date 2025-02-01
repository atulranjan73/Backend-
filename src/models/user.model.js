const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");
const jwt = require('jsonwebtoken')
 const bcrypt = require("bcrypt")

const userSchema = new Schema({
    username: { 
        type: String,
        required: true, 
        lowercase: true,
        trim: true ,
        index : true , 
    },
    fullname: {
        type : String ,
        require :true , 
        trim : true ,
        index : true ,
    },
    avtar:{
        type : String ,
        require : true ,
        
    },
    coverImage:{
        type : String ,

    },
    watchHistory :{
        type: Schema.Types.ObjectId,
        ref:"video"
    },
    password :{
        type : String,
        require : [true , " password  is require "] ,

    }

});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 8);
    next();
  });
  
  // Compare hashed password
  userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  // Generate JWT Access Token
  userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
      { _id: this._id },
      process.env.ACCESS_TOKEN_SECRET || "your_secret_key",
      { expiresIn:process.env.ACCESS_TOKEN_EXPIRE }
    );
  };
  
  // Generate JWT Refresh Token
  userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
      { _id: this._id },
      process.env.REFRESH_TOKEN_SECRET || "your_refresh_secret_key",
      { expiresIn:  process.env.REFRESH_TOKEN_EXPIRE}
    );
  };
  
  // Hide password when converting to JSON
  userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
  };
  
  userSchema.plugin(mongooseAggregatePaginate);
  
  module.exports = mongoose.model("User", userSchema);