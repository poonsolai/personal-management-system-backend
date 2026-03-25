import { Router } from "express";
import Leave from "../models/LeaveSchema.js";
const employeeLEAVroute = Router();

employeeLEAVroute.get('/:name', async (req, res)=>{
    let name = req.params.name;
    let val =await Leave.find({employee:name});
    if(val.length == 0){
        return res.send({success:false, message:" is empty "});
    }
    res.send({success:true, message:"succesfully got", leaves:val});
});

employeeLEAVroute.post('/', async (req, res)=>{
    const val = req.body;
    const date = new Date().toString();
    val.date = date;
    const leave = await Leave.create(val);
    res.send({success:true, message:"new leave request send successfully",data:val}); 
});

employeeLEAVroute.delete('/:id', async (req, res)=>{
    const id = req.params.id;
    const leave = await Leave.deleteOne({_id:id});
    res.send({success:true, message:"Leave request cancel successfully",data:leave}); 
});

export default employeeLEAVroute;