import mongoose from "mongoose";

const SalarySchema = mongoose.Schema({
    date:{
        type:String
    },
    is_generate:{
        type:Boolean,
        required:true
    },
    is_paid:{
        type:Boolean,
        required:true
    },
    month:{
        type:String,
        required:true
    }
});

const Salary = mongoose.model('salary', SalarySchema);

export default Salary;