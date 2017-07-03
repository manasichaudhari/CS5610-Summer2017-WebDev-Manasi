//***For heroku***

var app = require('./express');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname+'/public'));

require("./assignment/app");

app.set('port', (process.env.PORT || 7000));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});