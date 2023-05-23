const connectAPP = require("./express.loader.js");
const connectDB = require("./mongoose.loader.js");

/**
 * ## Start up Server
 * This function connects both the server and the database
 */
const connectSERVER = async() => {
    try{
        connectAPP();
        connectDB();
    } catch(err){
        console.error(err);
    }
};

module.exports = connectSERVER;