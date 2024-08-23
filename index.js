const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require('./models/chat.js'); // Rename to 'Chat' for clarity
const exp = require("constants");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main().then(() => {
    console.log("Connection is successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Create a new chat document
let chat1 = new Chat({
    from: "Shivam",
    to: "Draweshwar",
    msg: "Send me your OOPs notes",
    created_at: new Date()
});

chat1.save().then(() => {
    // Optional: log the result
    // console.log(res);
});

// Route to display all chats
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats });
});

// Route to display form for creating new chat
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// Route to handle creation of a new chat
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat
        .save()
        .then(() => {
            console.log("Chat was saved");
        })
        .catch((err) => {
            console.log(err);
        });
    res.redirect("/chats");
});

// Route to display edit form for a chat
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id); // Use 'Chat' here for consistency
    res.render("edit.ejs", { chat });
});

//Update Route
app.put("/chats/:id", async (req,res) =>{
    let {id} = req.params;
    let { msg: newmsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg: newmsg},
        {runValidators: true, new: true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
});

//Destrou route

app.delete("/chats/:id", async (req,res) =>{
    let{id} = req.params;
    let deletedchat = await Chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
});

// Home route
app.get("/", (req, res) => {
    res.send("Working");
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
