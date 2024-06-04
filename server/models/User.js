const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], 
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Profile", 
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }] // Reference to Project model
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);

module.exports = User;
