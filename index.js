const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./Models/chat");
const methodOverride = require('method-override');


app.set("views",path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
main()
.then(()=> {
    console.log("connection sccessful");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// //! index Route
app.get("/chats", async (req, res) => {
   let Chats = await Chat.find();
   console.log(Chats);
   res.render("index.ejs", {Chats});
});

// New Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// Create Route
app.post("/chats",(req, res) => {
    let {from, to, msg} = req.body; 
    let newChat = new Chat ({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })
    newChat.save().then((res) =>{
        console.log("chat was saved");
    })
    .catch((err) => {
        console.log(err);
    });

    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

//update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    try {
        let updateChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
        console.log(updateChat);
        res.redirect(`/chats/${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
//delete route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await Chat.findByIdAndDelete(id);
        console.log(`Chat with id ${id} has been deleted.`);
        res.redirect("/chats");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// let chat1 = new Chat({
//         from: "neha",
//         to: "priya",
//         msg:"send me your exam sheets",
//         created_at:new Date()
// });

// chat1.save() .then((res)=>{
//     console.log(res);
// });

app.get("/", (req, res)=> { 
    res.send("root is working")
});

app.listen(8080, () =>{
    console.log("server is listening on port 8080");

});
