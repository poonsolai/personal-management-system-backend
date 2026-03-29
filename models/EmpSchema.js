import mongoose from "mongoose";

const emp_schema =mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    department:{
        type:String,
        trim:true,
        
    },
    role:{
        type:String,
        trim:true,
 
    },
    date:{
        type:String
    },
    salary:{
        type:String,
        trim:true
    }
});


const Employee = mongoose.model('employess',emp_schema);

export default Employee;