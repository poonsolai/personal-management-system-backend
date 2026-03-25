import { Router } from "express";
import Employee from "../models/EmpSchema.js";
import User from '../models/userSchema.js'; // auth'

const adminEMProute = Router();


adminEMProute.get('/users',async (req, res)=>{
    const user = await Employee.find();
    res.send({success:true,users:user});
});

adminEMProute.get('/user/:dept',async (req, res)=>{
    let {dept} = req.params;
    
    if(dept == "All"){
        let emp = await Employee.find();
        return res.send({success:true,user:emp});
    }
    let emp = await Employee.find({department:dept});
    return res.send({success:true,user:emp});
});

adminEMProute.post('/user',async (req, res)=>{
    
    let val = req.body

    let user = await User.find({email:val.email, name:val.name});
    if(user.length == 0){
        return res.send({success:false,message:"This Employee Is Not Authorized or check employee name and mail"});
    }
    let user2 = await Employee.find({email:val.email, name:val.name});
    if(!user2.length == 0){
        return res.send({success:false,message:"This Employee Is Already Added"});
    }
    let data = await Employee.create(val);
    res.send({success:true,message:"Employee add Successfully", data:data});
})
adminEMProute.put('/user/:id',async (req, res)=>{

    let val = req.body;
    let data = await Employee.updateOne({_id:req.params.id},{$set:val});
    res.send({success:true,message:"Update Successfully", data:data});

})

adminEMProute.delete('/user/:id',async (req, res)=>{
    let id = req.params.id;
    let data = await Employee.deleteOne({_id:id});
    res.send({success:true,message:"Deleted Successfully",data:data});
})


export default adminEMProute;