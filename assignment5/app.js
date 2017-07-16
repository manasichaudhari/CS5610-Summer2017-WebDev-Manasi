var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://127.0.0.1:27017/assignment';
if (process.env.MONGODB_URI) {
    connectionString = process.env.MONGODB_URI;
}
mongoose.connect(connectionString, {
    useMongoClient: true,
});

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');