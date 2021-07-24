// initialise mongoose

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//define the schema

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },

},{
    timestamps: true,
});

//initialise the Model Schema
const User = mongoose.model ('User',userSchema)

module.exports = User;