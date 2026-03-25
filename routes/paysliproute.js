import {Router} from 'express';
import Payslip from '../models/PayslipSchema.js';
import Employee from '../models/EmpSchema.js';
import Salary from '../models/SalarySchema.js';

const paysliproute = Router();

let year = new Date().getFullYear();
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'];
let month = new Date().getMonth();
let datu = new Date().toString();
let date = new Date().getDate();


paysliproute.post('/', async (req, res)=>{
    const salary = await Salary.create({
        month : months[month] +" " + year,
        is_generate : false,
        is_paid : false,
        date : datu
    })
    res.send({success:true});
});

paysliproute.get('/status', async (req, res)=>{
    const status = await Salary.findOne({month : months[month] +" " + year});
    res.send({success:true, ans:status});
});

paysliproute.get('/createslip' , async (req, res)=>{
            
            let employee = await Employee.find();
            let lessamt1 = 2900;// lessthen 20000 
            let lessamt2 = 6900;// lessthen 50000
            let lessamt3 = 11900;// greaterthen 50000

            if(date != 23){
                return res.send({success:false, message:"Only Allowed on 'Day-5'"});
            }

            let exist = await Salary.findOne({month : months[month] +" " + year});

            if(exist && exist.is_generate){
                return res.send({success:false, message:"PaySlip Allready Generated.."});
            }
            //
            employee.map(async (e)=>{
                let payslip = await Payslip.create({
                    emp_name : e.name,
                    date : datu,
                    month: months[month] +" " + year ,
                    basic: e.salary <= 20000 ? `${Number(e.salary) - lessamt1}` : e.salary <= 50000 ? `${Number(e.salary) - lessamt2}` : `${Number(e.salary) - lessamt3}`  ,
                    hra: e.salary <= 20000 ? "1700" : e.salary <= 50000 ? "3700" : "6700"  ,
                    other: e.salary <= 20000 ? "600" : e.salary <= 50000 ? "1600" : "2600"  ,
                    deduct: e.salary <= 20000 ? "600" : e.salary <= 50000 ? "1600" : "2600"  ,
                    net: e.salary,
                    status:"Pending"
                });
            
            });

            await Salary.updateOne({month : months[month] +" " + year}, {is_generate:true});
            let payslip =await Payslip.find({month: months[month] +" " + year});
            res.send({success:true, message:"suucessfully create this month payslip", staus:"Pending", data:payslip})  
});


paysliproute.get('/:name' , async (req, res)=>{
    const {name} = req.params;
    const paybil = await Payslip.find({emp_name:name});
    const salary = await Employee.findOne({name : name})
    if(paybil.length == 0){
        return res.send({success:false, message:'is empty'});
    }
    res.send({success:true, message:"your payslips", payslip:paybil, totalsalry:salary.salary});
});

paysliproute.patch('/credit', async (req, res)=>{
    const paybil = await Payslip.updateMany({},{status:"Paid"});

    await Salary.updateOne({month : months[month] +" " + year}, {is_paid:true});
    res.send({success:true, message:"credit payments", status:"Paid"});

})

export default paysliproute;