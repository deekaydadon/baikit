//Installing Express

const express = require('express');

const path = require('path');


const app = express();

//Serve static files in dist directory 

app.use(express.static(__dirname + '/dist/baikit'));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname+'/dist/baikit/index.html'));
});

//Start app listening on the default Heroku port
app.listen(process.env.PORT || 8080);