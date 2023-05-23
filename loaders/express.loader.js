const express = require("express");
const app = express();


const connectAPP = async () => {

    try{
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));

            app.get("/", (req, res) => {
              res.send("Server Running");
            });

            // console.log()

    } catch (err){
        console.log(err);
    }

};

module.exports = connectAPP;


