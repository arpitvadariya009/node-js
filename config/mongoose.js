const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1/demo');

if(db){
    console.log("db connected");
}
else{
    console.log("db not connected");
}

module.exports = db;