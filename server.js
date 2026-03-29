import express from 'express'
import dontenv from 'dotenv';
import ConnectDB from './config/db.js';
import authRouter from './routes/authroute.js';
import cors from 'cors';
import session from 'express-session';
import adminEMProute from './routes/adminEMProute.js';   // admin page routes import
import adminTASKroute from './routes/adminTASKroute.js'; // admin page routes import
import adminLEAVroute from './routes/adminLEAVroute.js'; // admin page routes import
import adminDASHroute from './routes/adminDASHroute.js'; // admin page routes import
import employeeDASHroute from './routes/employeeDASHroute.js'; // employee page routes import
import employeeLEAVroute from './routes/employeeLEAVroute.js'; // employee page routes import
import employeeTASKroute from './routes/employeeTASKroute.js'; // employee page routes import
import paysliproute from './routes/paysliproute.js';// payslip routes import
import passport from './passport/passport.js';
dontenv.config(); // .env file la iruka datas use panna 

const PORT = process.env.PORT; // server running port number

const app  = express(); // express app create panna 

ConnectDB(); // database connect panna

app.use(cors(
    {
        origin : "https://spms-innovixus.vercel.app", // frontend url 
        // origin : "http://localhost:5173", // frontend url 
        credentials : true  // credentional acept
    }
)); // cors origin issue va ignore panna

app.use(express.json()); //json data read panna

app.use(session({
    secret : process.env.SESSION_SECRECT,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge : 60 * 1000 * 24
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    res.send({"message":"Welcome new user .. .please login to access the dashbord"});
});

app.get('/user',(req, res)=>{
    res.send({messa:"sdsads",user:req.user});
})

app.use('/auth', authRouter);
app.use('/admin/emp', adminEMProute);
app.use('/admin/task', adminTASKroute);
app.use('/admin/leave', adminLEAVroute);
app.use('/admin/dashbord', adminDASHroute);
app.use('/employee/dashbord', employeeDASHroute);
app.use('/employee/leave', employeeLEAVroute);
app.use('/employee/task', employeeTASKroute);
app.use('/employee/task', employeeTASKroute);
app.use('/payslip', paysliproute);


app.listen(3000,()=>{
    console.log('server running ... '+ PORT)
})
