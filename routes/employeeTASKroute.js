import { Router } from "express";
import Task from "../models/taskSchema.js";
const employeeTASKroute = Router();

employeeTASKroute.get('/:name', async (req, res)=>{
    let {name} = req.params;
    let val = await Task.find({assign_to:name.toLowerCase()});
    if(val.length == 0){
        return res.send({success:false, message:"is empty" })
    }
    res.send({success:true, message:"successfully get tasks", task:val });
})
export default employeeTASKroute;