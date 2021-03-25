const mongoose = require("mongoose");
const bcrypt =  require ("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
      name:{
          type:String,
          required:true
      },
      username:{
          type:String,
          require:true
      },
      password:{
          type:String,
          required:true
        },
      email:{
           type:String,
           required:true,
           unique:true
      },
      contact:{
          type:Number,
          required:true,
          unique:true
      },
      gender:{
          type:String,
          required:true,
      },
      tokens:[{
          token:{
              type:String,
              required:true
          }
      }]
})
userSchema.methods.generateAuthtoken=async function(){
    try{
        console.log(this._id);
        const token=jwt.sign({_id:this._id.toString()},"hellofriendsmynameisanshitagarg9");
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(error){
        res.send("the error part"+error);
        console.log("the error part"+error);
    }
}


userSchema.pre("save", async function(next){

    if(this.isModified("password")){

    console.log (`the current password is ${this.password}`);
    this.password= await bcrypt.hash(this.password,10);
    console.log (`the current password is ${this.password}`);

    }
    next();

})





const Register = new mongoose.model("Register",userSchema);

module.exports = Register;