const express = require('express');
const app = express();
const fs = require('fs');
const routes = express.Router();
const control = require('../controller/control');
const path = require('path');

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

routes.get('/',control.home);
routes.post('/createdata',imageUpload,control.create);
routes.get('/view',control.view);
routes.get('/deletedata/:id',control.deletedata);
routes.get('/editdata/:id',control.editdata);
routes.post('/updatedata',imageUpload,control.updatedata);


module.exports = routes;
