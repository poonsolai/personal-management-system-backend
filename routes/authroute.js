import { Router } from "express";
import User from '../models/userSchema.js'; // auth
import Employee from "../models/EmpSchema.js"; // employee
import hassPassword from '../utils/hashPaaword.js';
import passport from '../passport/passport.js';

const authRouter = Router();

authRouter.post('/signup',async (req, res)=>{
    //admin key
    let KEY = process.env.ADMIN_KEY;

    let {name, email, password, key, gender} = req.body;
    //username check in db
    let findname = await User.find({name : name});
    if(findname.length !== 0){
        return res.send({success:false,message:'username already exist'});
    }
    //email check in db
    let findmail = await User.find({email : email});
    if(findmail.length !== 0){
        return res.send({success:false,message:'email already exist'});
    }
    // key based role set 
    let Role = '';
    if(!key == ""){
        if(key.toUpperCase() === KEY){
            Role = "admin"
        }else{
            return res.send({success:false,message:"Enter vaild admin key "})
        }
    }else{
        Role = "employee"
    }
    // password hash 
    password = hassPassword(password);
    // database la new user create useing create method  : alternative method also iruku  -- new User({}) !imp use save() --
    let user = await User.create({
        name : name?.toLowerCase(),
        email : email,
        password : password,
        gender : gender,
        role : Role ,
        date : new Date().toDateString(),
    });
    if(Role == "employee"){
        let emp = await Employee.create({
            name : name?.toLowerCase(),
            email : email,
            role : null,
            date : new Date().toDateString(),
            salary: null,
            department : null
        })
    }
    // send response for user ;
    return  res.status(201).send({success:true,message:'new user created successfully'}); 

});

authRouter.post('/login', async (req, res, next)=>{
    const {mail, password} = req.body;
    console.log(mail, password);
    passport.authenticate('local', (err, user, info)=>{
        if(err) return next(err);
        if(!user){
            return res.send({success:false,message:info.message});
        }
        req.login(user, (err)=>{
            if(err){
                return res.status(500).send({success:false,message:"Login Failed ..."})
            }
            return res.json({
                success:true,
                message:"Login Successfull ...",
                user: req.user
            });
        })
    })(req, res, next);
});


authRouter.get('/users',async (req, res)=>{
    const user = await User.find();
    console.log(user);
    res.send("dd")
})

export default authRouter;