var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
        username: {type: String, unique:true, required: true },
    password: String,
    firstName: String,
    lastName: String,
    roles: [{type: String,
        default:'USER',
        enum:['USER','FACULTY','STUDENT','ADMIN']}],
        google: {
            id:  String,
            token: String
        },
        facebook: {
            id: String,
            token: String
        },
    phone: Number,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated:{type:Date, default: Date.now}},
    {collection: "assignment_user"});

module.exports = userSchema;