var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique:true, required: true},
    password: {type: String, unique:true, required: true},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated:{type:Date, default: Date.now}},
    {collection: "assignment_user"});

module.exports = userSchema;