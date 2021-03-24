const http = require ("http")
const server=http.createServer((req,res)=>{
    // console.log(req.url)
    if(req.url=='/'){
        res.end("hello from home side.")
    } else if(req.url=='/about'){
        res.end("hello from about side.")
    } else {
        res.writeHead(404, {"Content-Type":"text/html"})
        res.end("<h1>Error</h1>")
    }
    
});
server.listen(8000,()=>{
    console.log("listening on port 8000")
})