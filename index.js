const express = require('express');
const port = 9000;
const path = require('path');
const fs = require('fs');
const app = express();
const db = require('./config/mongoose');
app.use(express.urlencoded());


const imagePath = path.join("uploads");
app.use("/uploads",express.static(path.join(__dirname,"uploads")));


const multer = require('multer');

const mystorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,imagePath);  
    },
    filename : (req,file,cb) => {
        cb(null,file.fieldname+"-"+Date.now()); 
    }
})

const imageUpload = multer({ storage : mystorage}).single('avatar');


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,('views')));

app.use('/',require('./routes/routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server start on port ="+port);
});