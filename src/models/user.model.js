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


userSchema.pre('save' , async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password , 8 )
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password , this.password)
}

module.exports = mongoose.model("User", userSchema);
