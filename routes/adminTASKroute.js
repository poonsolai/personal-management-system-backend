import { Router } from "express";
import Task from '../models/taskSchema.js'; 
import Employee from "../models/EmpSchema.js";

const adminTASKroute = Router();

adminTASKroute.get('/', async (req, res)=>{
    const task = await Task.find();
    res.send({success:true,message:"Get all tasks ",tasks:task});
});

adminTASKroute.get('/:emp/:status', async (req, res)=>{
    const {emp, status} = req.params;

    if(emp == 'All' && status == "All"){
        let task = await Task.find();
        return res.send({success:true,tasks:task});
    }else if(emp == 'All'){
        let task = await Task.find({status:status});
        return res.send({success:true,tasks:task});
    }else if(status == "All"){
        let task = await Task.find({assign_to:emp});
        return res.send({success:true,tasks:task});
    }
    let task = await Task.find({assign_to:emp, status:status});
    return res.send({success:true,tasks:task});   
    
});

adminTASKroute.post('/new', async (req, res)=>{
    const val = req.body;
    const emp = await Employee.find({name : val.assign_to});
    
    console.log(val);
    if(emp.length == 0){
        return  res.send({success:false,message:"This Employee not available"});
    }
    let datu = new Date().toDateString();
    let task = await Task.create({
        task : val.task,
        assign_to : val.assign_to,
        status : val.status || "Pending",
        deadline : val.deadline,
        date : datu
    })
    
    res.send({success:true,message:"New Task Added"})
});

adminTASKroute.put('/:id',async (req, res)=>{

    let val = req.body;
    val.assign_to = val.assign_to.toLowerCase();
    let data = await Task.updateOne({_id:req.params.id},{$set:val});

    res.send({success:true,message:"Update Successfully", data:data});

})

adminTASKroute.delete('/:id',async (req, res)=>{
    let id = req.params.id;
    let data = await Task.deleteOne({_id:id});
    res.send({success:true,message:"Deleted Successfully",data:data});
})


export default adminTASKroute;