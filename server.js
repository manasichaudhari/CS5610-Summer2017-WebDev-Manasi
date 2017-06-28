//using express with node js
var app = require('./express');
var bodyParser = require('body-parser');

// var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./assignment/app");

// configure a public directory to host static content
app.use(app.express.static(__dirname+'/'));

app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function() {
    console.log('Running on port', app.get('port'));
});
