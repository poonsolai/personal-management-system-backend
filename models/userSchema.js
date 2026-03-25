import mongoose, { Mongoose } from "mongoose";

const user_schema =mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        trim:true
    },
    role:{
        type:String,
        trim:true,
        default:"user"
    },
    details:{
        type:Object
    },
    date:{
        type:String
    }
});


const User = mongoose.model('users',user_schema);

export default User;