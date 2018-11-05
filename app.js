'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jsonwebtoken = require('jsonwebtoken');
var config = require("./config")
const fileUpload = require('express-fileupload');
var membership = require('./routes/membership_procedures')
var API = require('./routes/APIs')
var superSecret = config.secretKey;
var pages = require("./routes/pages")
var app = express();
app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('node_modules', path.join(__dirname, 'node_modules'));

app.set('view engine', 'ejs'); // template engine
//app.engine('html',ejs.renderFile); // turn engine to use html

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
//app.use(function (req, res, next) {
//    console.log("birileri girmeye çalişiyor");
//    var token = req.body.token || req.param("token") || req.headers["x-access-token"];
//    console.log("token: " + token);
//    if (token) {
//        jsonwebtoken.verify(token, superSecret, function (err, decoded) {
//            if (err) { 
//            res.status(403).send({ success: false, message: "failed to authentication" });
//        }
//            else {
//                console.log("decoded:" + JSON.stringify(decoded));
//                req.decoded = decoded;

//            }
//        });

//    }
//    next();
//});
app.use('/', pages);
app.use('/membership', membership);
app.use('/API', API);

//app.use(redirectUnmatched);

mongoose.connect(config.mongoUrl, config.connectionOptions, function (err) {
    if (err) {
        console.log(err);
    }
    else console.log("connected to database");
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json( {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

//function redirectUnmatched(req, res) {
//    res.redirect("/yakinda");
//}