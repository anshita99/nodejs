const fs=require("fs")
//creating a new file
// fs.writeFileSync('read.txt','welcome user');

// fs.writeFileSync('read.txt',' Anshita welcomes,welcome user');

// fs.appendFileSync("read.txt"," How are u ")


// const buf_data=fs.readFileSync("read.txt");
// console.log(buf_data);

// const data=fs.readFileSync("read.txt");
// org_data=data.toString();
// console.log(org_data);

// fs.writeFile("blog.txt","hello sunshine!!",(err)=>{
//     console.log("done successfully");
//     console.log(err)
// })

// fs.appendFile("blog.txt", "How are you", (err)=>{
//     console.log("Work appended successfully")
// })

// fs.readFile("blog.txt","utf-8",(err, data)=>{
//     console.log(data)
   
// })
// console.log("hello world")

fs.rename("blog.txt","myblg.txt", (err)=>{
    console.log("renamed");
})

