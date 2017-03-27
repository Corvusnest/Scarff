// Common package
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

// Download packages
const express = require('express');
const expressHandlebars = require('express-handlebars');
const compression = require('compression');
const bodyParser = require('body-parser');

// Setting Document
const SETTING = require('./settings');

// Express settings
const app = express();
const PORT = process.env.PORT || SETTING.port || 3000;
const ENV = process.env.NODE_ENV || SETTING.runningEnv || 'development';
app.set('env', ENV);

if ( SETTING.https ){
    // using HTTPS
    let keyPath = path.join(__dirname, SETTING.httpsKey);
    let certPath = path.join(__dirname, SETTING.httpsCert);
    if ( !fs.existsSync(keyPath) || !fs.existsSync(certPath) ){
        console.error(MESSAGE.keypairError);
        process.exit();
    }
    let options = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
        passphrase: SETTING.httpsPassphrase,
    };
    https.createServer(options, app).listen(PORT);
} else {
    // using HTTP
    http.createServer(app).listen(PORT);
}

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

// Handlebars view engine
// https://github.com/ericf/express-handlebars
var hbs = expressHandlebars.create({
    extname: '.hbs',
    partialsDir: 'views/_partials/',
    layoutsDir: 'views/_layouts/',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Use compression
app.use(compression());

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie
if ( SETTING.cookie ){
    const cookieParser = require('cookie-parser');
    app.use(cookieParser(SETTING.cookieSecret));
}

// Session
// https://github.com/expressjs/session
if ( SETTING.session ){
    const session = require('express-session');
    app.use(session({
      secret: SETTING.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge: SETTING.sessionAge},
    }));
}

// logger
if ( SETTING.logger ){
    require('./model/logger')(app);
}

// Router
require('./routes/_router')(app);

// Catch 404 and forward to error handler
require('./routes/errorCatch')(app);
