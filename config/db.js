import mongoose from "mongoose";

async function ConnectDB(){
    const DB_URL = process.env.DB_URL;
    try{
        await mongoose.connect(DB_URL);
        console.log('database connected successfully');
    }catch(err){
        console.log(err);
    }
}


export default ConnectDB