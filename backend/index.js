const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
// const { json } = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 100000
}));
app.use(bodyParser.json({
    limit: '50mb',
    parameterLimit: 100000
}));
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/keeperDB", { useNewUrlParser: true });



const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    key:Number
});

const NewNote = mongoose.model("Note", noteSchema);






app.post("/add", async(req, res)=>{

    const newTitle = req.body.databody.name;
    const newContent = req.body.databody.content;
    // console.log(newTitle);
    // console.log(newContent);
    const newNote = new NewNote({
        title: newTitle,
        content: newContent,
        key: 1
    });
    newNote.save();
    
});


app.post("/data", async(req, res)=>{
    
    const allData = await NewNote.find({});
    // console.log(allData);
    res.json(allData);
    
});

app.post("/delete", async (req, res) => {
    const delTitle = req.body;
    console.log(delTitle);
    NewNote.deleteOne({ title: req.body.title}).then(function (err) {
        if (!err) { console.log("deleted"); } else { console.log(err); }
    });
});

app.post("/update", async (req, res) => {
    NewNote.updateOne({ title: req.body.newName }, { content: req.body.newContent }).then(function (err) {
        if (!err) { console.log("updated"); } else { console.log(err); }
        
    })
});



app.listen(5000 || process.env.PORT, function () {
    console.log('Server is running on port 5000.');
});