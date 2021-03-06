var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page:{type: mongoose.Schema.Types.ObjectId , ref:"PageModel"},
    widgetType: {type: String, enum:['HEADING','IMAGE','YOUTUBE','HTML','TEXT']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    index: Number,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date , default:Date.now}
    },
    {collection:"assignment_widget"});

module.exports = widgetSchema;