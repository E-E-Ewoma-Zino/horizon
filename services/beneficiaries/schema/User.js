const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required:true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        account: {
            type: Number,
            required: true,
        }
    }
);


module.exports = mongoose.model("User", UserSchema);