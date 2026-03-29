import {Router} from 'express';
import Task from '../models/taskSchema.js';
import Employee from '../models/EmpSchema.js';
import Leave from '../models/LeaveSchema.js'
import User from '../models/userSchema.js';

const adminDASHroute = Router();

adminDASHroute.get('/', async (req, res)=>{
    let emp = await Employee.find();
    let task = await Task.find({status : "In Progress"});
    let length = await Task.find();
    let leave = await Leave.find({status : "Pending"});
    res.send({seccess:true, message:"successfully get datas", employees:emp, tasks:task, leaves:leave,tasklength:length.length});
});

adminDASHroute.get('/check/:name', async (req, res)=>{
    const {name} = req.params;
    let user = await User.find({name:name});
    res.send({seccess:true, message:"successfully you a admin", user:user});
    
});
export default adminDASHroute;