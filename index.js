const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const chat = require("./models/chat.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

main().then((res) =>{
    console.log("connection is successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1 = new chat({
    from: "Shivam",
    to: "Draweshwar",
    msg: "send me your oops notes",
    created_at: new Date()
});

chat1.save().then((res) =>{
    // console.log(res);
});

app.get("/chats", async(req,res) =>{
    let chats = await chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})

app.get("/",(req,res) =>{
    res.send("app is working");
})

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
})