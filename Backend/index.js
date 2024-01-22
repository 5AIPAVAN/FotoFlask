const express= require("express");
const mongoose = require("mongoose");
const cors = require('cors');
// const { Socket } = require("socket.io");
const socket = require('socket.io');


mongoose.connect("mongodb://127.0.0.1:27017/FDFED")
.then(()=>{console.log("MONGO DB CONNECTED SUCCESSFULLY")})
.catch(()=>{console.log("SOME ERROR OCCURED IN CONNECTING MONGODB")})


const app = express();
app.use(express.json());

app.use(cors());
app.use('/api/user', require('./Routes/User'));
app.use('/api/post', require('./Routes/Post'));
app.use('/api/reels', require('./Routes/Reels'));
const server = app.listen(5000,()=>{
    console.log("Backend server running at PORT : 5000");
})

const io = socket(server,{
    cors:{
        origin:'http://localhost:3000',
        credentails:true
    }
})

global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    global.chatsocket =socket;
    socket.on("addUser",(id)=>{
        onlineUsers.set(id,socket.id);
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket  = onlineUsers.get(data.io);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message)
        }
    })
})