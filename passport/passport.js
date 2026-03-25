import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from '../utils/hashPaaword.js'
import User from "../models/userSchema.js";

console.log("passport file runnning ...");
passport.use( new LocalStrategy( {usernameField:"mail"}, async (mail, password, done)=>{
    // console.log( "local"+mail, password);

    let user = await User.findOne({email:mail});
    // console.log(user);
    if(!user){
        return done(null, false, {message: "Invaild mail"});
    }
    let pass = comparePassword(password, user.password);
    if(!pass){
        return done(null, false, {message:"Incorrect Password"});
    }
    return done(null, user);

}));

passport.serializeUser((user, done)=>{
    console.log(user);
    return done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    try{
        let user = await User.findById(id);
        return done(null, user);
    }catch(err){
        return done(err);
    }
});


export default passport;