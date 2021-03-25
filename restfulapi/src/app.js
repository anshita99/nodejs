const express =require('express');
const app = express();
const port = process.env.PORT || 8000;
require("./db/conn")

const Student = require("./models/students");

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("hello")

})

// app.post("/students",(req,res)=>{

//     console.log(req.body);

//     const user=new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((error)=>{
//         res.status(400).send(error);
        
//     })
        
      
// })

app.post("/students", async(req,res)=>{
    try{
    const user=new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
}catch(error){
    res.status(400).send(error);
}

})

app.get("/students",async(req,res)=>{
    try{
        const studentData = await Student.find()
        res.send(studentData);
    }catch(e){
        res.send(e);

    }
})

app.get("/students/:id",async(req,res)=>{
    try{
        const _id = req.params.id;

        const studentData = await Student.findById(_id)

        res.send(studentData)
    }catch(e){
        res.status(500).send(e)
    }
})

app.patch("/students/:id", async(req,res)=>{

    try{
        const _id = req.params.id;
        const studentUpdate = await Student.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(studentUpdate);

    }catch(e){
        res.status(400).send(e)
    }

})

app.delete("/students/:id",async(req,res)=>{
    try{
    const studentDelete=await Student.findByIdAndDelete(req.params.id);
    if(!req.params.id){
        return res.status(400).send();
    }
    res.send(studentDelete);
    }catch(e){
      res.status(500).send(e);
    }
})

app.listen(port,()=>{
    console.log(`connection successful at ${port}`);
})