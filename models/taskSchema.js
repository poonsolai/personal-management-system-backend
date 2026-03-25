import mongoose from "mongoose";

const Task_Schema = mongoose.Schema({
    task:{
        type:String,
        require : true,
        trim : true
    },
    assign_to:{
        type:String,
        require : true,
        trim : true
    },
    status:{
        type:String,
        require : true,
        trim : true
    },
    deadline:{
        type:String,
        require : true,
        trim : true
    },
    assign:{
        type:String,
        default:"admin",
    },
    date:{
        type:String
    }
});

const Task = mongoose.model('tasks', Task_Schema);

export default Task;
