const path = require('path')
const express = require('express');
const hbs=require('hbs');
const app = express();

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'))
const staticPath=path.join(__dirname,'../public')
const templatePath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set("view engine","hbs")
app.set("views",templatePath)
hbs.registerPartials(partialsPath)


app.get("/",(req, res)=>{
    res.render("index",{
        changeName: "Anshita"
    })
}); 

app.get("/about",(req,res)=>{
    res.render("about",{
        changeName: "Anshita"
    })
})

app.get("/user",(req,res)=>{
    res.render("user",{
        changeName: "Anshita"
    })
})
app.get("/about/*",(req,res)=>{
    res.render("404",{
        errorcomment:"oops the about page couldn't be found"
    })
})

app.use(express.static(staticPath));

app.get("/user/*",(req,res)=>{
    res.render("404",{
        errorcomment:"oops the user page couldn't be found"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        errorcomment:"oops the page couldn't be found"
    })
})



app.get("/",(req, res)=>{
    res.write("<h1>hello from express</h1>");
    res.write("<h1>hello user</h1>");
    res.send();
}) ;
app.get('/about',(req,res)=>{
    res.send("hello")
})

// app.get('/temp',(req,res)=>{
//     res.send([{
//         id:1,
//         name:"Anshita",
//     },
//     {
//         id:1,
//         name:"Anshita",
//     },
//     {
//         id:1,
//         name:"Anshita",
//     }]);
// })

app.get('/temp',(req,res)=>{
    res.json([{
        id:1,
        name:"Anshita",
    },
    {
        id:1,
        name:"Anshita",
    },
    {
        id:1,
        name:"Anshita",
    }]);
})

app.listen(8000,()=>{
    console.log("listening the port at 8000");
});