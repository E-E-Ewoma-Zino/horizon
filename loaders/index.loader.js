const connectAPP = require("./express.loader.js");
const connectDB = require("./mongoose.loader.js");
const express = require("express");
const app = express();

const port = process.env.ACCESS_PORT;
const connectSERVER = async() => {
    try{
        connectAPP();
        connectDB();

        app.listen(port, () => {
          console.log(`Server running on port ${port}.`);
        });
        console.log('Server Connect Successful');

    } catch(err){
        console.log(err);
    }
};

module.exports = connectSERVER;
