const mongoose = require('mongoose');
const Chat = require("./Models/chat");

main()
.then(()=> {
    console.log("connection sccessful");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "neha",
        to: "preeti",
        msg: "send me notes for the exam",
        created_at: new Date(),

    },
    {
        
        from: "rohit",
        to: "mohit",
        msg: "tech me a js callbacks",
        created_at: new Date(),
    },
    {
        
        from: "sunil",
        to: "saurbh",
        msg: "all the best",
        created_at: new Date(),
    },
    {
        
        from: "anita",
        to: "ramesh",
        msg: "bring some fruits",
        created_at: new Date(),
    },
    {
        
        from: "tony",
        to: "peter",
        msg: "love you 3000",
        created_at: new Date(),
    },
];


Chat.insertMany(allChats);
    
