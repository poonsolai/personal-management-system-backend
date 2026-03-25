import {Router} from 'express';
import Leave from '../models/LeaveSchema.js'
const adminLEAVroute = Router();


adminLEAVroute.get('/', async (req, res)=>{
    let leaves = await Leave.find();
    res.send({success:true, message:"successfully",leaves:leaves}); 
});


adminLEAVroute.patch('/:id', async (req, res)=>{
    let action = req.body.action;
    const id = req.params.id;
    const leave = await Leave.updateOne({_id:id}, {status:action});
    res.send({success:true,message:"update successfully "});
})

export default adminLEAVroute;