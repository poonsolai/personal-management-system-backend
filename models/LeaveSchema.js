import mongoose from 'mongoose';

const LeaveSchema = mongoose.Schema({
    employee:{
        type:String,
        trim:true,
        require : true
    },
    fromDate:{
        type:String,
        trim:true,
        require : true
    },
    toDate:{
        type:String,
        require : true,
        trim:true
        
    },
    reason:{
        type:String,
        require : true,
        trim:true,
    },
    status:{
        type:String,
        require : true,
        trim:true
    },
    date:{
        type:String
    },
});

 const Leave = mongoose.model('leaves', LeaveSchema);

 export default Leave