import {Router} from 'express';
import Employee from '../models/EmpSchema.js';
import Task from '../models/taskSchema.js';
import Leave from '../models/LeaveSchema.js';

const employeeDASHroute = Router();

employeeDASHroute.get('/:name/:email',async (req, res)=>{
    const {name, email} = req.params;
    let user = await Employee.findOne({name:name, email:email});
    if(!user){
        return res.send({success:false, message:"You not are a employee and Please contact a admin"});
    }
    res.send({success:true, message:"you are a employee", user:user});
})

employeeDASHroute.get('/:name', async (req, res)=>{
    const {name} = req.params;
    let task = await Task.find({assign_to:name?.toLowerCase()});
    let leave = await Leave.find({employee:name?.toLowerCase()});
    // if(leave.length == 0 || task.length == 0){
    //     return res.send({success:true, message:"is empty", tasks:task, leaves:leave});
    // }
    res.send({success:true, message:"succesfully ", tasks:task, leaves:leave});
})













export default employeeDASHroute;