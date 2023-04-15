const express = require('express');
const app = express();
const db = require('../config/mongoose');
const usermodel = require('../model/usermodel');
const fs = require('fs');
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

const form = (req,res) =>{
    return res.render('form');
}
const create = async (req, res) => {
    try {
      const data = await usermodel.create({
        grid: req.body.grid,
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        phone: req.body.phone,
        course: req.body.course,
        fees: req.body.fees,
        avatar : imagePath+"/"+req.file.filename
       
      });
      console.log("data added");
      return res.redirect('back');
    }
    catch(err){
        if(err){
            console.log(err);
            return false;
        }
    }
}
const view = async (req,res)=>{
    try{
        const data =await usermodel.find({});
        return res.render('view',{
            alldata : data
        })
    }
    catch(err){
        if(err){
            console.log(err);
            return false
        }
    }
}
const deletedata = async (req,res)=>{
    try{
        let id = req.params.id;

        const data = await usermodel.findById(id);
        fs.unlinkSync(data.avatar);

        await usermodel.findByIdAndDelete(id);
        console.log("data delete");
        return res.redirect('back');
    }
    catch(err){
        if(err){
            console.log(err);
            return false
        }
    }
}
const editdata = async (req,res)=>{
    try{
        let id = req.params.id;

        const data = await usermodel.findById(id);
        return res.render('edit',{
            editdata : data
        });
    }
    catch(err){
        if(err){
            console.log(err);
            return false
        }
    }
}

const updatedata = async (req,res)=>{
    try{
        let id = req.body.id;

        if(req.file){
            const data = await usermodel.findById(id);
            fs.unlinkSync(data.avatar);

            await usermodel.findByIdAndUpdate(id,{
                grid: req.body.grid,
                name: req.body.name,
                email: req.body.email,
                pass: req.body.pass,
                phone: req.body.phone,
                course: req.body.course,
                fees: req.body.fees,
                avatar : imagePath+"/"+req.file.filename
            })
            return res.redirect('/view');
        }
        else{
           const data = await usermodel.findById(id);
           let oldimg = data.avatar;

           await usermodel.findByIdAndUpdate(id,{
            grid: req.body.grid,
            name: req.body.name,
            email: req.body.email,
            pass: req.body.pass,
            phone: req.body.phone,
            course: req.body.course,
            fees: req.body.fees,
            avatar :oldimg
           })
           return res.redirect('/view');
        }
       
    }
    catch(err){
        if(err){
            console.log(err);
            return false;
        }
    }
}
module.exports = { form,create,view,deletedata,editdata,updatedata}