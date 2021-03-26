const jwt = require ("jsonwebtoken");
const Register = require ("../models/signup");

const auth = async (req, res,next)=>{
    try{
        const token=req.cookies.jwt;
        const verifyUser = jwt.verify(token,process.env.SECRET);
        console.log(verifyUser);

        const user=Register.findOne({_id:verifyUser._id})
        console.log(user);
        next();
    }catch(e){
        res.status(401).send(e)
    }
}
module.exports = auth;