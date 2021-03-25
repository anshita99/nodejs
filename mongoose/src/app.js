const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/Anshita",{
    useNewUrlParser: true,  useUnifiedTopology: true
}).then(()=>console.log("connection successful..."))
.catch((err)=>console.log(err));

const playlistSchema = new mongoose.Schema({
    name:{
         type:String,
         required:true
    },
    type: String,
    active:Boolean,
    date: {
        type:Date,
        default:Date.now
    }
})

const Playlist = new mongoose.model("Playlist",playlistSchema)

const createDocument = async () => {
    try{
const jsPlaylist = new Playlist({
    name: "React JS",
   type: "Front End",
   active:true
   
})
const nodePlaylist = new Playlist({
    name: "Node JS",
   type: "Back End",
   active:true
   
})
const mongoPlaylist = new Playlist({
    name: "MongoDB",
   type: "Database",
   active:true
   
})
const mongoosePlaylist = new Playlist({
    name: "Mongoose JS",
   type: "Database",
   active:true
   
})

const result = await Playlist.insertMany([jsPlaylist,nodePlaylist,mongoPlaylist,mongoosePlaylist]);
console.log(result)}catch(err){
    console.log(err);
}
}

createDocument();