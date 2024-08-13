const mongoose = require('mongoose');

const chat = require("./models/chat.js");

main().then((res) =>{
    console.log("connection is successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allchats = [{
    from: "Shivam",
    to: "Draweshwar",
    msg: "send me your oops notes",
    created_at: new Date()
},
{
    from: "pankaj",
    to: "Draweshwar",
    msg: "send me your resume",
    created_at: new Date()
},
{
    from: "Ritik",
    to: "Draweshwar",
    msg: "Dube Randibaaj hai",
    created_at: new Date()
},
{
    from: "Tom",
    to: "Draweshwar",
    msg: "Give me your illegal weapon",
    created_at: new Date()
},
{
    from: "Ruby",
    to: "Draweshwar",
    msg: "please send me syllabus",
    created_at: new Date()
},
];

chat.insertMany(allchats).then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

// chat1.save().then((res) =>{
//     console.log(res);
// });