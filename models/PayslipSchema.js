import mongoose from 'mongoose'

const PayslipSchema = mongoose.Schema({
    emp_name:{
        type:String,
        trim:true,
        required:true
    },
    month:{
        type:String,
        trim:true,
        required:true
    },
    basic:{
        type:Number,  //  3/4
    },
    hra:{
        type:Number,  // 
    },
    other:{
        type:Number, 
    },
    deduct:{
        type:Number,     
    },
    net:{
        type:Number,    
    },
    date:{
        type:String
    },
    status:{
        type:String
    }
});

const Payslip = mongoose.model('payslip', PayslipSchema);

export default Payslip;