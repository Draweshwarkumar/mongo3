const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const chat = require("./models/chat.js");
const exp = require("constants");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));

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
    // console.log(chats);
    res.render("index.ejs",{chats});
});

app.get("/chats/new",(req,res) =>{
    res.render("new.ejs");
});

app.post("/chats",(req,res) =>{
    let {from, to,msg} = req.body;
    let newChat = new chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat
    .save()
    .then((res) =>{
        console.log("chat was saved");
    })
    .catch((err) =>{
        console.log(err);
    })
    res.redirect("/chats")
});

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await chat.findById(id); // Use 'Chat' here for consistency
    res.render("edit.ejs", {chat});
});

app.get("/",(req,res) =>{
   res.send("working");
});

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
})